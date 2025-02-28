"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {onAuthStateChanged} from "@firebase/auth";
import {useRouter} from "next/navigation";

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
}

export default function ProfilePage() {
  const router = useRouter();

  useEffect(() => {
    const redirect = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/sign-in");
      }
    });
    return () => redirect();
  }, [router]);

  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, setValue } = useForm<ProfileData>();
  const [uid, setUid] = useState("");

  useEffect(() => {
    const redirect = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setValue("firstName", data.firstName);
          setValue("lastName", data.lastName);
          setValue("email", data.email);
          setValue("createdAt", data.createdAt);
        }
        setLoading(false);
      }
    });
    return () => redirect();
  }, [setValue]);

  const onSubmit = async (data: ProfileData) => {
    try {
      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, {
        firstName: data.firstName,
        lastName: data.lastName,
      });
      toast.success("Profile Updated",{
        description: "Your profile has been successfully updated",
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Error",{
        description: "Failed to update profile",
      });
    }
  };

  if (loading) return <div className="container py-8">Loading...</div>;

  return (
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>First Name</Label>
                <Input {...register("firstName")} required />
              </div>
              <div>
                <Label>Last Name</Label>
                <Input {...register("lastName")} required />
              </div>
            </div>

            <div>
              <Label>Email</Label>
              <Input {...register("email")} disabled />
            </div>

            <div>
              <Label>Account Created</Label>
              <Input {...register("createdAt")} disabled />
            </div>

            <Button type="submit">Save Changes</Button>
          </form>
        </CardContent>
      </Card>
  );
}