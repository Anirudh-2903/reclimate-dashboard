'use client';

import { DistributionCard } from '@/components/DistributionCard';
import { SearchBar } from '@/components/SearchBar';
import { DistributionRecord } from '@/types';
import { useRouter } from 'next/navigation';
import {  useState } from 'react';
import {onAuthStateChanged} from "@firebase/auth";
import {auth} from "@/firebase";
import {getUserData} from "@/services/dbService";

export default function Distribution() {

  const router = useRouter();
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in
      const uid = user.uid;

      try {
        // Fetch user data using the UID
        const userData = await getUserData(uid);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    } else {
      // User is signed out
      router.push("/sign-in");
    }
  });

  const [distributions] = useState<DistributionRecord[]>(
    [
      {
        "id": 1,
        "date": "2025-02-11",
        "time": "10:15 AM",
        "imageSrc": "/placeholder.svg",
        "farmerName": "Aisha Ibrahim",
        "distributionType": "Mix",
        "distributionQty": "2200.00 kg",
        "buyerName": "Sarah Lee",
        "vehicle": "Toyota Hilux"
      },
      {
        "id": 2,
        "date": "2025-02-12",
        "time": "11:45 AM",
        "imageSrc": "/placeholder.svg",
        "farmerName": "John Doe",
        "distributionType": "Premium",
        "distributionQty": "1800.00 kg",
        "buyerName": "David Smith",
        "vehicle": "Ford Ranger"
      },
      {
        "id": 3,
        "date": "2025-02-13",
        "time": "02:00 PM",
        "imageSrc": "/placeholder.svg",
        "farmerName": "Emily Davis",
        "distributionType": "Organic",
        "distributionQty": "1500.00 kg",
        "buyerName": "Linda Brown",
        "vehicle": "Honda CR-V"
      },
      {
        "id": 4,
        "date": "2025-02-14",
        "time": "04:30 PM",
        "imageSrc": "/placeholder.svg",
        "farmerName": "Michael Johnson",
        "distributionType": "Standard",
        "distributionQty": "2000.00 kg",
        "buyerName": "James White",
        "vehicle": "Nissan Frontier"
      },
      {
        "id": 5,
        "date": "2025-02-15",
        "time": "08:00 AM",
        "imageSrc": "/placeholder.svg",
        "farmerName": "Sophie Williams",
        "distributionType": "Industrial",
        "distributionQty": "2500.00 kg",
        "buyerName": "Jack Wilson",
        "vehicle": "Chevrolet Silverado"
      },
      {
        "id": 6,
        "date": "2025-02-16",
        "time": "06:15 AM",
        "imageSrc": "/placeholder.svg",
        "farmerName": "Liam Martinez",
        "distributionType": "Raw",
        "distributionQty": "3000.00 kg",
        "buyerName": "Olivia Taylor",
        "vehicle": "Toyota Tacoma"
      },
      {
        "id": 7,
        "date": "2025-02-17",
        "time": "01:00 PM",
        "imageSrc": "/placeholder.svg",
        "farmerName": "Zara Patel",
        "distributionType": "Granular",
        "distributionQty": "3500.00 kg",
        "buyerName": "Sophia Green",
        "vehicle": "Ford F-150"
      },
      {
        "id": 8,
        "date": "2025-02-18",
        "time": "09:30 AM",
        "imageSrc": "/placeholder.svg",
        "farmerName": "Ravi Kumar",
        "distributionType": "Organic",
        "distributionQty": "2700.00 kg",
        "buyerName": "Robert Harris",
        "vehicle": "Ram 1500"
      },
      {
        "id": 9,
        "date": "2025-02-19",
        "time": "03:00 PM",
        "imageSrc": "/placeholder.svg",
        "farmerName": "Maya Singh",
        "distributionType": "Industrial",
        "distributionQty": "4000.00 kg",
        "buyerName": "Eva Clark",
        "vehicle": "GMC Sierra"
      },
      {
        "id": 10,
        "date": "2025-02-20",
        "time": "11:00 AM",
        "imageSrc": "/placeholder.svg",
        "farmerName": "Samir Ahmed",
        "distributionType": "Standard",
        "distributionQty": "1800.00 kg",
        "buyerName": "Jessica Adams",
        "vehicle": "Honda Pilot"
      },
      {
        "id": 11,
        "date": "2025-02-21",
        "time": "10:45 AM",
        "imageSrc": "/placeholder.svg",
        "farmerName": "Fatima Ali",
        "distributionType": "Premium",
        "distributionQty": "2200.00 kg",
        "buyerName": "Oscar Walker",
        "vehicle": "Chevrolet Colorado"
      },
      {
        "id": 12,
        "date": "2025-02-22",
        "time": "02:30 PM",
        "imageSrc": "/placeholder.svg",
        "farmerName": "Raghav Mehta",
        "distributionType": "Mix",
        "distributionQty": "2500.00 kg",
        "buyerName": "William Harris",
        "vehicle": "Ford Explorer"
      }
    ]

  );

  const [filteredData, setFilteredData] = useState(distributions);

  return (
    <div className="min-h-screen bg-gray-50">
      <SearchBar type="Distribution" data={distributions} onFilter={setFilteredData} />
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