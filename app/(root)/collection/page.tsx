'use client';

import { CollectionCard } from '@/components/CollectionCard';
import { SearchBar } from '@/components/SearchBar';
import { TopNavbar } from '@/components/TopNavbar';
import { FPUData } from '@/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Collection = () => {

  const router = useRouter();

  useEffect(() => {
    // Check for authentication token in localStorage (or cookies)
    const isAuthenticated = localStorage.getItem('authToken'); // You can use cookies/session if preferred.

    // If user is not authenticated, redirect to the sign-in page
    if (isAuthenticated !== "dummy-token") {
      router.push('/sign-in'); // Assuming the auth page is at /auth
    }
  }, [router]);

  const [FPUData] = useState<FPUData[]>(
    [
      {
        "fpuName": "GreenHarvest Solutions",
        "biomassDetails": {
          "source": "Rice stalk",
          "weight": "1800 kg"
        },
        "date": "2025-02-05",
        "vehicleType": "Nissan Frontier"
      },
      {
        "fpuName": "EcoEnergy Farms",
        "biomassDetails": {
          "source": "Palm fronds",
          "weight": "2000 kg"
        },
        "date": "2025-02-08",
        "vehicleType": "Isuzu D-Max"
      },
      {
        "fpuName": "CleanCrop Technologies",
        "biomassDetails": {
          "source": "Sugarcane leaves",
          "weight": "1500 kg"
        },
        "date": "2025-02-11",
        "vehicleType": "Toyota Hilux"
      },
      {
        "fpuName": "BioCycle Innovations",
        "biomassDetails": {
          "source": "Coconut husk",
          "weight": "2200 kg"
        },
        "date": "2025-02-13",
        "vehicleType": "Mitsubishi Triton"
      },
      {
        "fpuName": "SustainableAgro Solutions",
        "biomassDetails": {
          "source": "Rubber tree bark",
          "weight": "1700 kg"
        },
        "date": "2025-02-15",
        "vehicleType": "Ford Ranger"
      },
      {
        "fpuName": "RegenEarth Tech",
        "biomassDetails": {
          "source": "Corn stalks",
          "weight": "2100 kg"
        },
        "date": "2025-02-17",
        "vehicleType": "Chevrolet Silverado"
      },
      {
        "fpuName": "EcoCycle Systems",
        "biomassDetails": {
          "source": "Wheat straw",
          "weight": "1600 kg"
        },
        "date": "2025-02-19",
        "vehicleType": "Honda Ridgeline"
      },
      {
        "fpuName": "CarbonFarm Innovations",
        "biomassDetails": {
          "source": "Algae biomass",
          "weight": "1300 kg"
        },
        "date": "2025-02-21",
        "vehicleType": "Toyota Tacoma"
      },
      {
        "fpuName": "CleanGreen Solutions",
        "biomassDetails": {
          "source": "Mulberry leaves",
          "weight": "1900 kg"
        },
        "date": "2025-02-24",
        "vehicleType": "Ram 1500"
      },
      {
        "fpuName": "AgriRenew Technologies",
        "biomassDetails": {
          "source": "Cotton stalks",
          "weight": "1750 kg"
        },
        "date": "2025-02-27",
        "vehicleType": "GMC Canyon"
      }
    ]
  );

  const [filteredData, setFilteredData] = useState(FPUData);

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavbar />
      <SearchBar type="Collection" data={FPUData} onFilter={setFilteredData} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-4 p-4 sm:gap-6 sm:p-6">
        {filteredData.map((item, index) => (
          <CollectionCard fpuData={item} key={index} />
        ))}
      </div>

    </div>
  )
}

export default Collection