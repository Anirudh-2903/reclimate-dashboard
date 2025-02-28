// authService.ts
import { auth, db } from "@/firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import {doc, setDoc} from "firebase/firestore"; // Firestore functions
import { FirebaseError } from "firebase/app";

// authService.ts
export const signUp = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
) => {

    try {
        // Validate email and password
        if (!email || !password) {
            throw new Error("Email and password are required.");
        }
        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // Save additional user information to Firestore
        const userRef = doc(db, "users", userCredential.user.uid);
        await setDoc(userRef, {
            uid: userCredential.user.uid,
            firstName,
            lastName,
            email,
            createdAt: new Date().toLocaleDateString("en-GB", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            }),
            timestamp: new Date().toISOString(),
        });

        return userCredential.user;
    } catch (error) {
        if (error instanceof FirebaseError) {
            switch (error.code) {
                case "auth/email-already-in-use":
                    throw new Error("The email address is already in use.");
                case "auth/invalid-email":
                    throw new Error("The email address is invalid.");
                case "auth/weak-password":
                    throw new Error("The password must be at least 6 characters long.");
                default:
                    throw new Error(error.message);
            }
        } else {
            throw new Error("An unknown error occurred.");
        }
    }
};

export const signIn = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        if (error instanceof FirebaseError) {
            throw new Error(error.message);
        } else {
            throw new Error("An unknown error occurred.");
        }
    }
};