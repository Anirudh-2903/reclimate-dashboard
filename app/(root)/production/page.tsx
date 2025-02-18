'use client';

import { ProductionCard } from '@/components/ProductionCard';
import { SearchBar } from '@/components/SearchBar';
import { TopNavbar } from '@/components/TopNavbar';
import { ProcessItem } from '@/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Production() {

  const router = useRouter();

  useEffect(() => {
    // Check for authentication token in localStorage (or cookies)
    const isAuthenticated = localStorage.getItem('authToken'); // You can use cookies/session if preferred.

    // If user is not authenticated, redirect to the sign-in page
    if (isAuthenticated !== "dummy-token") {
      router.push('/sign-in'); // Assuming the auth page is at /auth
    }
  }, [router]);

  const [processes] = useState<ProcessItem[]>(
    [
      {
        "id": "1",
        "name": "Batch No.1",
        "date": "2025-02-01",
        "status": "In Progress",
        "timeStatus": "08:13 AM - In Progress",
        "biomassQty": "500,000",
        "biocharQty": "100,000",
        "approved": true,
        "mediaStatus": { "temperature": 1, "images": 3, "videos": 3 }
      },
      {
        "id": "2",
        "name": "Palm Kernel Shell (PKS)",
        "date": "2025-02-03",
        "status": "Completed",
        "timeStatus": "02:45 PM - Completed",
        "biomassQty": "350,000",
        "biocharQty": "75,000",
        "approved": true,
        "mediaStatus": { "temperature": 2, "images": 5, "videos": 2 }
      },
      {
        "id": "3",
        "name": "Coconut Husk",
        "date": "2025-02-05",
        "status": "Pending",
        "timeStatus": "11:30 AM - Pending",
        "biomassQty": "600,000",
        "biocharQty": "120,000",
        "approved": false,
        "mediaStatus": { "temperature": 3, "images": 2, "videos": 1 }
      },
      {
        "id": "4",
        "name": "Rice Husk",
        "date": "2025-02-07",
        "status": "Blocked",
        "timeStatus": "05:20 PM - Blocked",
        "biomassQty": "700,000",
        "biocharQty": "140,000",
        "approved": false,
        "mediaStatus": { "temperature": 3, "images": 4, "videos": 4 }
      },
      {
        "id": "5",
        "name": "Wood Chips",
        "date": "2025-02-09",
        "status": "Unassigned",
        "timeStatus": "09:10 AM - Unassigned",
        "biomassQty": "450,000",
        "biocharQty": "90,000",
        "approved": false,
        "mediaStatus": { "temperature": 2, "images": 6, "videos": 2 }
      },
      {
        "id": "6",
        "name": "Corn Stover",
        "date": "2025-02-11",
        "status": "Completed",
        "timeStatus": "10:00 AM - Completed",
        "biomassQty": "300,000",
        "biocharQty": "60,000",
        "approved": true,
        "mediaStatus": { "temperature": 1, "images": 3, "videos": 1 }
      },
      {
        "id": "7",
        "name": "Sawdust",
        "date": "2025-02-13",
        "status": "Blocked",
        "timeStatus": "03:15 PM - Blocked",
        "biomassQty": "500,000",
        "biocharQty": "100,000",
        "approved": false,
        "mediaStatus": { "temperature": 2, "images": 5, "videos": 3 }
      },
      {
        "id": "8",
        "name": "Wheat Straw",
        "date": "2025-02-15",
        "status": "Unassigned",
        "timeStatus": "07:45 AM - Unassigned",
        "biomassQty": "200,000",
        "biocharQty": "40,000",
        "approved": false,
        "mediaStatus": { "temperature": 3, "images": 4, "videos": 2 }
      },
      {
        "id": "9",
        "name": "Sugarcane Bagasse",
        "date": "2025-02-17",
        "status": "In Progress",
        "timeStatus": "06:20 PM - In Progress",
        "biomassQty": "650,000",
        "biocharQty": "130,000",
        "approved": true,
        "mediaStatus": { "temperature": 1, "images": 2, "videos": 1 }
      },
      {
        "id": "10",
        "name": "Bamboo Waste",
        "date": "2025-02-19",
        "status": "Pending",
        "timeStatus": "12:30 PM - Pending",
        "biomassQty": "400,000",
        "biocharQty": "80,000",
        "approved": false,
        "mediaStatus": { "temperature": 2, "images": 5, "videos": 3 }
      },
      {
        "id": "11",
        "name": "Olive Pomace",
        "date": "2025-02-21",
        "status": "Completed",
        "timeStatus": "04:00 PM - Completed",
        "biomassQty": "550,000",
        "biocharQty": "110,000",
        "approved": true,
        "mediaStatus": { "temperature": 3, "images": 6, "videos": 4 }
      },
      {
        "id": "12",
        "name": "Almond Shells",
        "date": "2025-02-23",
        "status": "Blocked",
        "timeStatus": "08:50 AM - Blocked",
        "biomassQty": "350,000",
        "biocharQty": "70,000",
        "approved": false,
        "mediaStatus": { "temperature": 1, "images": 3, "videos": 2 }
      },
      {
        "id": "13",
        "name": "Peanut Shells",
        "date": "2025-02-25",
        "status": "Unassigned",
        "timeStatus": "05:10 PM - Unassigned",
        "biomassQty": "480,000",
        "biocharQty": "96,000",
        "approved": false,
        "mediaStatus": { "temperature": 2, "images": 5, "videos": 3 }
      },
      {
        "id": "14",
        "name": "Coffee Husk",
        "date": "2025-02-27",
        "status": "Pending",
        "timeStatus": "09:30 AM - Pending",
        "biomassQty": "370,000",
        "biocharQty": "74,000",
        "approved": false,
        "mediaStatus": { "temperature": 3, "images": 4, "videos": 2 }
      },
      {
        "id": "15",
        "name": "Tea Waste",
        "date": "2025-02-29",
        "status": "In Progress",
        "timeStatus": "02:20 PM - In Progress",
        "biomassQty": "600,000",
        "biocharQty": "120,000",
        "approved": true,
        "mediaStatus": { "temperature": 1, "images": 2, "videos": 1 }
      }
    ]

  );

  const [filteredData, setFilteredData] = useState(processes);


  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavbar />
      <SearchBar type="Production" data={processes} onFilter={setFilteredData} />
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