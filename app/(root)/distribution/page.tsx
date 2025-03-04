'use client';

import { DistributionCard } from '@/components/DistributionCard';
import { SearchBar } from '@/components/SearchBar';
import { DistributionRecord } from '@/types';
import { useRouter } from 'next/navigation';
import {useEffect, useState} from 'react';
import {onAuthStateChanged} from "@firebase/auth";
import {auth, db} from "@/firebase";
import {collection, getDocs} from "@firebase/firestore";
import {CardSkeletonDistribution} from "@/components/CardSkeleton";
import ErrorState from "@/components/ErrorAlert";
import {NoResults} from "@/components/NoResults";

export default function Distribution() {

  const router = useRouter();
  const [distributionData, setDistributionData] = useState<DistributionRecord[]>([]);
  const [filteredData, setFilteredData] = useState<DistributionRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const querySnapshot = await getDocs(collection(db, "distributions"));
          // @ts-ignore
          const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as DistributionRecord[];
          setDistributionData(data);
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

  if (loading) return <CardSkeletonDistribution />
  if (error) return <ErrorState error={error} onRetry={() => window.location.reload()} />;
  if(filteredData.length === 0) return (
      <div className="min-h-screen bg-gray-50">
        <SearchBar type="Distribution" data={distributionData} onFilter={setFilteredData} />
        <NoResults />;
      </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <SearchBar type="Distribution" data={distributionData} onFilter={setFilteredData} />
      <div className="max-w-7xl mx-auto py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-4 p-4 sm:gap-6 sm:p-6">
          {filteredData.map((item, index) => (
            <DistributionCard distributionData={item} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}