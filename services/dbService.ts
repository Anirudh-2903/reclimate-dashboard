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
    createdAt: string;
}

export interface ProductionData {
    biomassName: string;
    date: string;
    status: string;
    assessment: string;
    startTime: string;
    biomassQty: string;
    biocharQty: string;
    createdAt: string;
    moistureContent: Record<string, string>;
    moistureImage: string;
    thermometerImages: string[];
    videos: string[];
    additionalImages: string[];
    mediaStatus: {
        temperature: number;
        addImages: number;
        videos: number;
    };
}

export interface MixingData {
    date: string;
    category: string;
    type: string;
    volume: string;
    packagingDetails: string;
    availableUnpackedMix: string;
    otherMixQty: string;
    imageUrl?: string;
    createdAt: string;
}

export interface DistributionData {
    date: string;
    farmerName: string;
    vehicle: string;
    buyerName: string;
    distributionType: string;
    distributionQty: string;
    imageUrl?: string;
    createdAt: string;
}

export   const uploadFile = async (file: File, path: string) => {
    const fileRef = ref(storage, `uploads/${path}/${file.name}`);
    await uploadBytes(fileRef, file);
    return getDownloadURL(fileRef);
};

export const uploadCollectionData = async (data: CollectionData, imageFile?: File) => {
    if (imageFile) {
        data.imageUrl = await uploadFile(imageFile,"collectionImages");
    }
    return await addDoc(collection(db, "collections"), data);
};


export const uploadProductionData = async (data: ProductionData, files: {
        moistureImage?: File;
        thermometerImages?: File[];
        videos?: File[];
        additionalImages?: File[];
    }) => {
    try {
        const dataToUpload = { ...data };

        // Upload moisture image and get URL
        if (files.moistureImage) {
            dataToUpload.moistureImage = await uploadFile(files?.moistureImage, "moistureImages");
        }

        // Upload thermometer images (wait for all promises to resolve)
        if (files.thermometerImages && files.thermometerImages?.length > 0) {
            const thermometerPromises = files.thermometerImages?.map(file =>
                uploadFile(file, "thermometerImages")
            );
            dataToUpload.thermometerImages = await Promise.all(thermometerPromises);
        } else {
            dataToUpload.thermometerImages = [];
        }

        // Upload videos (wait for all promises to resolve)
        if (files.videos && files.videos.length > 0) {
            const videoPromises = files.videos.map(file =>
                uploadFile(file, "videos")
            );
            dataToUpload.videos = await Promise.all(videoPromises);
        } else {
            dataToUpload.videos = [];
        }

        // Upload additional images (wait for all promises to resolve)
        if (files.additionalImages && files.additionalImages.length > 0) {
            const imagePromises = files.additionalImages.map(file =>
                uploadFile(file, "additionalImages")
            );
            dataToUpload.additionalImages = await Promise.all(imagePromises);
        } else {
            dataToUpload.additionalImages = [];
        }

        // Update media status
        dataToUpload.mediaStatus = {
            temperature: dataToUpload.thermometerImages.length,
            addImages: dataToUpload.additionalImages.length,
            videos: dataToUpload.videos.length,
        };

        // Upload data to Firestore
        return await addDoc(collection(db, "productions"), dataToUpload);
    } catch (error) {
        console.error("Error uploading production data:", error);
        throw error;
    }
};

export const uploadMixingData = async (data: MixingData, imageFile?: File) => {
    if (imageFile) {
        data.imageUrl = await uploadFile(imageFile,"mixingImages");
    }
    return await addDoc(collection(db, "mixings"), data);
};

export const uploadDistributionData = async (data: DistributionData, imageFile?: File) => {
    if (imageFile) {
        data.imageUrl = await uploadFile(imageFile,"distributionImages");
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