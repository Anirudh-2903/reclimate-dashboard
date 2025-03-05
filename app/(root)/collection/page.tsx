'use client';

import { CollectionCard } from '@/components/CollectionCard';
import { SearchBar } from '@/components/SearchBar';
import { FPUData } from '@/types';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "@/firebase";
import { collection, getDocs } from "@firebase/firestore";
import { db } from "@/firebase";
import {CardSkeletonCollection} from "@/components/CardSkeleton";
import ErrorState from "@/components/ErrorAlert";
import {NoResults} from "@/components/NoResults";



const Collection = () => {
    const router = useRouter();
    const [FPUData, setFPUData] = useState<FPUData[]>([]);
    const [filteredData, setFilteredData] = useState<FPUData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const querySnapshot = await getDocs(collection(db, "collections"));
                    // @ts-ignore
                    const data = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    })) as FPUData[];
                    const sortedData = data.sort((a, b) => b.createdAt.localeCompare(a.createdAt)); // Sort by ISO string
                    setFPUData(sortedData);
                } catch (error) {
                    console.error("Error fetching data:", error);
                    setError('Failed to fetch data');
                } finally {
                    setLoading(false);
                }
            } else {
                router.push("/sign-in");
            }
        });

        return () => unsubscribe();
    }, [router]);

    if (loading) return <CardSkeletonCollection />
    if (error) return <ErrorState error={error} onRetry={() => window.location.reload()} />;
    if(filteredData.length === 0) return (
        <div className="min-h-screen bg-gray-50">
            <SearchBar type="Collection" data={FPUData} onFilter={setFilteredData} />
            <NoResults />;
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <SearchBar type="Collection" data={FPUData} onFilter={setFilteredData} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-4 p-4 sm:gap-6 sm:p-6">
                {filteredData.map((item, index) => (
                        <CollectionCard fpuData={item} key={index} />
                ))}
            </div>
        </div>
    );
}

export default Collection;