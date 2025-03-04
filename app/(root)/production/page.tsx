'use client';

import { ProductionCard } from '@/components/ProductionCard';
import { SearchBar } from '@/components/SearchBar';
import {ProductionData} from '@/types';
import { useRouter } from 'next/navigation';
import {useEffect, useState} from 'react';
import {onAuthStateChanged} from "@firebase/auth";
import {auth, db} from "@/firebase";
import {collection, getDocs} from "@firebase/firestore";
import {CardSkeletonProduction} from "@/components/CardSkeleton";
import ErrorState from "@/components/ErrorAlert";
import {NoResults} from "@/components/NoResults";

export default function Production() {

  const router = useRouter();
  const [productionData, setProductionData] = useState<ProductionData[]>([]);
  const [filteredData, setFilteredData] = useState<ProductionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const querySnapshot = await getDocs(collection(db, "productions"));
          // @ts-ignore
          const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as ProductionData[];
          setProductionData(data);
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

  if (loading) return <CardSkeletonProduction />
  if (error) return <ErrorState error={error} onRetry={() => window.location.reload()} />;
  if(filteredData.length === 0) return (
      <div className="min-h-screen bg-gray-50">
        <SearchBar type="Production" data={productionData} onFilter={setFilteredData} />
        <NoResults />;
      </div>
  );


  return (
    <div className="min-h-screen bg-gray-50">
      <SearchBar type="Production" data={productionData} onFilter={setFilteredData} />
      <div className="max-w-7xl mx-auto py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-4 p-4 sm:gap-6 sm:p-6">
          {filteredData.map((item, index) => (
            <ProductionCard process={item} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}