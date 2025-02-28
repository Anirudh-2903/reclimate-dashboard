import { doc, getDoc } from "firebase/firestore";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "@/firebase";

export interface CollectionData {
    fpuName: string;
    biomassDetails: {
        source: string;
        weight: string;
    };
    date: string;
    vehicleType: string;
    imageUrl?: string;
}

export interface ProductionData {
    name: string;
    date: string;
    status: string;
    timeStatus: string;
    biomassQty: string;
    biocharQty: string;
    approved: boolean;
    mediaStatus: {
        temperature: number;
        images: number;
        videos: number;
    };
    moistureReadings: number[];
    images: string[];
    videos: string[];
    assessment: string;
}

export interface MixingData {
    date: string;
    category: string;
    type: string;
    volume: string;
    packagingDetails: string;
    availableUnpackedMix: string;
    otherMixQty: string;
}

export interface DistributionData {
    date: string;
    farmerName: string;
    vehicle: string;
    buyerName: string;
    distributionType: string;
    distributionQty: string;
    imageUrl?: string;
}

export const uploadFile = async (file: File) => {
    const storageRef = ref(storage, `uploads/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
};

export const uploadCollectionData = async (data: CollectionData, imageFile?: File) => {
    if (imageFile) {
        data.imageUrl = await uploadFile(imageFile);
    }
    return await addDoc(collection(db, "collections"), data);
};

export const uploadProductionData = async (data: ProductionData, files: {
    moistureImage?: File;
    thermometerImages?: File[];
    videos?: File[];
    additionalImages?: File[];
}) => {
    const uploads = await Promise.all([
        files.moistureImage ? uploadFile(files.moistureImage) : null,
        ...(files.thermometerImages?.map(uploadFile) || []),
        ...(files.videos?.map(uploadFile) || []),
        ...(files.additionalImages?.map(uploadFile) || []),
    ]);

    data.images = uploads.filter(url => url) as string[];
    data.videos = []; // Separate videos if needed
    data.mediaStatus = {
        temperature: files.thermometerImages?.length || 0,
        images: data.images.length,
        videos: files.videos?.length || 0
    };

    return await addDoc(collection(db, "productions"), data);
};

export const uploadMixingData = async (data: MixingData) => {
    return await addDoc(collection(db, "mixings"), data);
};

export const uploadDistributionData = async (data: DistributionData, imageFile?: File) => {
    if (imageFile) {
        data.imageUrl = await uploadFile(imageFile);
    }
    return await addDoc(collection(db, "distributions"), data);
};

export const getUserData = async (uid: string) => {
    const userRef = doc(db, "users", uid); // Reference to the user's document in Firestore
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
        return userDoc.data(); // Return the user's data
    } else {
        throw new Error("User not found");
    }
};