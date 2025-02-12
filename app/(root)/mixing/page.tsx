'use client';

import { MixingCard } from '@/components/MixingCard';
import { SearchBar } from '@/components/SearchBar';
import { TopNavbar } from '@/components/TopNavbar';
import { MixData } from '@/types';
import { useState } from 'react';

export default function Mixing() {

  const [mixings] = useState<MixData[]>(
    [
      {
        "id": 1,
        "date": "12/02/2024",
        "time": "09:02 AM",
        "imageSrc": "/placeholder.svg",
        "category": "Mix",
        "type": "Compost",
        "volume": "50.00 Ltr",
        "openBiochar": "50.00 Ltr",
        "totalUnpackedMix": "0.00 kg",
        "availableUnpackedMix": "0.00 kg",
        "packagingDetails": "2 Bags",
        "otherMixQty": "50.00 kg",
        "viewLink": "#"
      },
      {
        "id": 2,
        "date": "13/02/2024",
        "time": "10:30 AM",
        "imageSrc": "/placeholder.svg",
        "category": "Premium",
        "type": "Organic",
        "volume": "30.00 Ltr",
        "openBiochar": "20.00 Ltr",
        "totalUnpackedMix": "10.00 kg",
        "availableUnpackedMix": "5.00 kg",
        "packagingDetails": "1 Bag",
        "otherMixQty": "20.00 kg",
        "viewLink": "#"
      },
      {
        "id": 3,
        "date": "14/02/2024",
        "time": "02:15 PM",
        "imageSrc": "/placeholder.svg",
        "category": "Standard",
        "type": "Raw",
        "volume": "75.00 Ltr",
        "openBiochar": "50.00 Ltr",
        "totalUnpackedMix": "25.00 kg",
        "availableUnpackedMix": "10.00 kg",
        "packagingDetails": "3 Bags",
        "otherMixQty": "60.00 kg",
        "viewLink": "#"
      },
      {
        "id": 4,
        "date": "15/02/2024",
        "time": "11:45 AM",
        "imageSrc": "/placeholder.svg",
        "category": "Mix",
        "type": "Activated",
        "volume": "40.00 Ltr",
        "openBiochar": "30.00 Ltr",
        "totalUnpackedMix": "10.00 kg",
        "availableUnpackedMix": "4.00 kg",
        "packagingDetails": "2 Bags",
        "otherMixQty": "30.00 kg",
        "viewLink": "#"
      },
      {
        "id": 5,
        "date": "16/02/2024",
        "time": "03:20 PM",
        "imageSrc": "/placeholder.svg",
        "category": "Industrial",
        "type": "Fine",
        "volume": "100.00 Ltr",
        "openBiochar": "90.00 Ltr",
        "totalUnpackedMix": "10.00 kg",
        "availableUnpackedMix": "2.00 kg",
        "packagingDetails": "5 Bags",
        "otherMixQty": "80.00 kg",
        "viewLink": "#"
      },
      {
        "id": 6,
        "date": "17/02/2024",
        "time": "07:50 AM",
        "imageSrc": "/placeholder.svg",
        "category": "Premium",
        "type": "Granular",
        "volume": "60.00 Ltr",
        "openBiochar": "45.00 Ltr",
        "totalUnpackedMix": "15.00 kg",
        "availableUnpackedMix": "5.00 kg",
        "packagingDetails": "3 Bags",
        "otherMixQty": "50.00 kg",
        "viewLink": "#"
      },
      {
        "id": 7,
        "date": "18/02/2024",
        "time": "06:30 PM",
        "imageSrc": "/placeholder.svg",
        "category": "Standard",
        "type": "Pelletized",
        "volume": "80.00 Ltr",
        "openBiochar": "60.00 Ltr",
        "totalUnpackedMix": "20.00 kg",
        "availableUnpackedMix": "7.00 kg",
        "packagingDetails": "4 Bags",
        "otherMixQty": "70.00 kg",
        "viewLink": "#"
      },
      {
        "id": 8,
        "date": "19/02/2024",
        "time": "12:05 PM",
        "imageSrc": "/placeholder.svg",
        "category": "Agricultural",
        "type": "Compost Blend",
        "volume": "90.00 Ltr",
        "openBiochar": "70.00 Ltr",
        "totalUnpackedMix": "20.00 kg",
        "availableUnpackedMix": "10.00 kg",
        "packagingDetails": "4 Bags",
        "otherMixQty": "75.00 kg",
        "viewLink": "#"
      },
      {
        "id": 9,
        "date": "20/02/2024",
        "time": "08:00 AM",
        "imageSrc": "/placeholder.svg",
        "category": "Mix",
        "type": "Compost",
        "volume": "55.00 Ltr",
        "openBiochar": "45.00 Ltr",
        "totalUnpackedMix": "5.00 kg",
        "availableUnpackedMix": "2.00 kg",
        "packagingDetails": "3 Bags",
        "otherMixQty": "40.00 kg",
        "viewLink": "#"
      },
      {
        "id": 10,
        "date": "21/02/2024",
        "time": "09:30 AM",
        "imageSrc": "/placeholder.svg",
        "category": "Premium",
        "type": "Organic",
        "volume": "35.00 Ltr",
        "openBiochar": "25.00 Ltr",
        "totalUnpackedMix": "15.00 kg",
        "availableUnpackedMix": "7.00 kg",
        "packagingDetails": "2 Bags",
        "otherMixQty": "28.00 kg",
        "viewLink": "#"
      },
      {
        "id": 11,
        "date": "22/02/2024",
        "time": "10:15 AM",
        "imageSrc": "/placeholder.svg",
        "category": "Standard",
        "type": "Raw",
        "volume": "70.00 Ltr",
        "openBiochar": "50.00 Ltr",
        "totalUnpackedMix": "30.00 kg",
        "availableUnpackedMix": "12.00 kg",
        "packagingDetails": "4 Bags",
        "otherMixQty": "55.00 kg",
        "viewLink": "#"
      },
      {
        "id": 12,
        "date": "23/02/2024",
        "time": "11:40 AM",
        "imageSrc": "/placeholder.svg",
        "category": "Mix",
        "type": "Activated",
        "volume": "45.00 Ltr",
        "openBiochar": "40.00 Ltr",
        "totalUnpackedMix": "5.00 kg",
        "availableUnpackedMix": "3.00 kg",
        "packagingDetails": "3 Bags",
        "otherMixQty": "32.00 kg",
        "viewLink": "#"
      },
      {
        "id": 13,
        "date": "24/02/2024",
        "time": "01:25 PM",
        "imageSrc": "/placeholder.svg",
        "category": "Industrial",
        "type": "Fine",
        "volume": "110.00 Ltr",
        "openBiochar": "95.00 Ltr",
        "totalUnpackedMix": "20.00 kg",
        "availableUnpackedMix": "8.00 kg",
        "packagingDetails": "6 Bags",
        "otherMixQty": "85.00 kg",
        "viewLink": "#"
      },
      {
        "id": 14,
        "date": "25/02/2024",
        "time": "05:00 PM",
        "imageSrc": "/placeholder.svg",
        "category": "Premium",
        "type": "Granular",
        "volume": "65.00 Ltr",
        "openBiochar": "50.00 Ltr",
        "totalUnpackedMix": "25.00 kg",
        "availableUnpackedMix": "12.00 kg",
        "packagingDetails": "4 Bags",
        "otherMixQty": "60.00 kg",
        "viewLink": "#"
      }
    ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavbar />
      <SearchBar type="Mixing" />
      <div className="max-w-7xl mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mixings.map((mixData) => (
              <MixingCard key={mixData.id} mixData={mixData} />
            ))}
        </div>
      </div>
    </div>
  );
}