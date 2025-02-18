'use client';

import { MixingCard } from '@/components/MixingCard';
import { SearchBar } from '@/components/SearchBar';
import { TopNavbar } from '@/components/TopNavbar';
import { MixData } from '@/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Mixing() {

  const router = useRouter();

  useEffect(() => {
    // Check for authentication token in localStorage (or cookies)
    const isAuthenticated = localStorage.getItem('authToken'); // You can use cookies/session if preferred.

    // If user is not authenticated, redirect to the sign-in page
    if (isAuthenticated !== "dummy-token") {
      router.push('/sign-in'); // Assuming the auth page is at /auth
    }
  }, [router]);

  const [mixings] = useState<MixData[]>(
    [
      {
        "id": 1,
        "date": "2025-02-12",
        "time": "09:02 AM",
        "imageSrc": "/placeholder.svg",
        "category": "Mix",
        "type": "Compost",
        "volume": "50.00 Ltr",
        "openBiochar": "50.00 Ltr",
        "totalUnpackedMix": "0.00 kg",
        "availableUnpackedMix": "0.00 kg",
        "packagingDetails": "2 ",
        "otherMixQty": "50.00 kg",
        "viewLink": "#"
      },
      {
        "id": 2,
        "date": "2025-02-13",
        "time": "10:30 AM",
        "imageSrc": "/placeholder.svg",
        "category": "Premium",
        "type": "Organic",
        "volume": "30.00 Ltr",
        "openBiochar": "20.00 Ltr",
        "totalUnpackedMix": "10.00 kg",
        "availableUnpackedMix": "5.00 kg",
        "packagingDetails": "1 ",
        "otherMixQty": "20.00 kg",
        "viewLink": "#"
      },
      {
        "id": 3,
        "date": "2025-02-14",
        "time": "02:15 PM",
        "imageSrc": "/placeholder.svg",
        "category": "Standard",
        "type": "Raw",
        "volume": "75.00 Ltr",
        "openBiochar": "50.00 Ltr",
        "totalUnpackedMix": "25.00 kg",
        "availableUnpackedMix": "10.00 kg",
        "packagingDetails": "3 ",
        "otherMixQty": "60.00 kg",
        "viewLink": "#"
      },
      {
        "id": 4,
        "date": "2025-02-15",
        "time": "11:45 AM",
        "imageSrc": "/placeholder.svg",
        "category": "Mix",
        "type": "Activated",
        "volume": "40.00 Ltr",
        "openBiochar": "30.00 Ltr",
        "totalUnpackedMix": "10.00 kg",
        "availableUnpackedMix": "4.00 kg",
        "packagingDetails": "2 ",
        "otherMixQty": "30.00 kg",
        "viewLink": "#"
      },
      {
        "id": 5,
        "date": "2025-02-16",
        "time": "03:20 PM",
        "imageSrc": "/placeholder.svg",
        "category": "Industrial",
        "type": "Fine",
        "volume": "100.00 Ltr",
        "openBiochar": "90.00 Ltr",
        "totalUnpackedMix": "10.00 kg",
        "availableUnpackedMix": "2.00 kg",
        "packagingDetails": "5 ",
        "otherMixQty": "80.00 kg",
        "viewLink": "#"
      },
      {
        "id": 6,
        "date": "2025-02-17",
        "time": "07:50 AM",
        "imageSrc": "/placeholder.svg",
        "category": "Premium",
        "type": "Granular",
        "volume": "60.00 Ltr",
        "openBiochar": "45.00 Ltr",
        "totalUnpackedMix": "15.00 kg",
        "availableUnpackedMix": "5.00 kg",
        "packagingDetails": "3 ",
        "otherMixQty": "50.00 kg",
        "viewLink": "#"
      },
      {
        "id": 7,
        "date": "2025-02-18",
        "time": "06:30 PM",
        "imageSrc": "/placeholder.svg",
        "category": "Standard",
        "type": "Pelletized",
        "volume": "80.00 Ltr",
        "openBiochar": "60.00 Ltr",
        "totalUnpackedMix": "20.00 kg",
        "availableUnpackedMix": "7.00 kg",
        "packagingDetails": "4 ",
        "otherMixQty": "70.00 kg",
        "viewLink": "#"
      },
      {
        "id": 8,
        "date": "2025-02-19",
        "time": "12:05 PM",
        "imageSrc": "/placeholder.svg",
        "category": "Agricultural",
        "type": "Compost Blend",
        "volume": "90.00 Ltr",
        "openBiochar": "70.00 Ltr",
        "totalUnpackedMix": "20.00 kg",
        "availableUnpackedMix": "10.00 kg",
        "packagingDetails": "4 ",
        "otherMixQty": "75.00 kg",
        "viewLink": "#"
      },
      {
        "id": 9,
        "date": "2025-02-20",
        "time": "08:00 AM",
        "imageSrc": "/placeholder.svg",
        "category": "Mix",
        "type": "Compost",
        "volume": "55.00 Ltr",
        "openBiochar": "45.00 Ltr",
        "totalUnpackedMix": "5.00 kg",
        "availableUnpackedMix": "2.00 kg",
        "packagingDetails": "3 ",
        "otherMixQty": "40.00 kg",
        "viewLink": "#"
      },
      {
        "id": 10,
        "date": "2025-02-21",
        "time": "09:30 AM",
        "imageSrc": "/placeholder.svg",
        "category": "Premium",
        "type": "Organic",
        "volume": "35.00 Ltr",
        "openBiochar": "25.00 Ltr",
        "totalUnpackedMix": "15.00 kg",
        "availableUnpackedMix": "7.00 kg",
        "packagingDetails": "2 ",
        "otherMixQty": "28.00 kg",
        "viewLink": "#"
      },
      {
        "id": 11,
        "date": "2025-02-22",
        "time": "10:15 AM",
        "imageSrc": "/placeholder.svg",
        "category": "Standard",
        "type": "Raw",
        "volume": "70.00 Ltr",
        "openBiochar": "50.00 Ltr",
        "totalUnpackedMix": "30.00 kg",
        "availableUnpackedMix": "12.00 kg",
        "packagingDetails": "4 ",
        "otherMixQty": "55.00 kg",
        "viewLink": "#"
      },
      {
        "id": 12,
        "date": "2025-02-23",
        "time": "11:40 AM",
        "imageSrc": "/placeholder.svg",
        "category": "Mix",
        "type": "Activated",
        "volume": "45.00 Ltr",
        "openBiochar": "40.00 Ltr",
        "totalUnpackedMix": "5.00 kg",
        "availableUnpackedMix": "3.00 kg",
        "packagingDetails": "3 ",
        "otherMixQty": "32.00 kg",
        "viewLink": "#"
      },
      {
        "id": 13,
        "date": "2025-02-24",
        "time": "01:25 PM",
        "imageSrc": "/placeholder.svg",
        "category": "Industrial",
        "type": "Fine",
        "volume": "110.00 Ltr",
        "openBiochar": "95.00 Ltr",
        "totalUnpackedMix": "20.00 kg",
        "availableUnpackedMix": "8.00 kg",
        "packagingDetails": "6 ",
        "otherMixQty": "85.00 kg",
        "viewLink": "#"
      },
      {
        "id": 14,
        "date": "2025-02-25",
        "time": "05:00 PM",
        "imageSrc": "/placeholder.svg",
        "category": "Premium",
        "type": "Granular",
        "volume": "65.00 Ltr",
        "openBiochar": "50.00 Ltr",
        "totalUnpackedMix": "25.00 kg",
        "availableUnpackedMix": "12.00 kg",
        "packagingDetails": "4 ",
        "otherMixQty": "60.00 kg",
        "viewLink": "#"
      }
    ]

  );

  const [filteredData, setFilteredData] = useState(mixings);


  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavbar />
      <SearchBar type="Mixing" data={mixings} onFilter={setFilteredData} />
      <div className="max-w-7xl mx-auto py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-4 p-4 sm:gap-6 sm:p-6">
          {filteredData.map((item, index) => (
            <MixingCard mixData={item} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}