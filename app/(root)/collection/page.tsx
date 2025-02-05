'use client';

import { CollectionCard } from '@/components/CollectionCard';
import { SearchBar } from '@/components/SearchBar';
import { TopNavbar } from '@/components/TopNavbar';
import { FPUData } from '@/types';
import { useState } from 'react';

const Collection  = () => {

  const [FPUData] = useState<FPUData[]>(
    [
    {
      "fpuName": 'GreenHarvest Solutions',
      "biomassDetails": {
        "source": 'Rice stalk',
        "weight": '1800 kg',
      },
      "date": '2024-03-15',
      "vehicleType": 'Nissan Frontier',
    },
    {
      "fpuName": 'EcoEnergy Farms',
      "biomassDetails": {
        "source": 'Palm fronds',
        "weight": '2000 kg',
      },
      "date": '2024-03-16',
      "vehicleType": 'Isuzu D-Max',
    },
    {
      "fpuName": 'CleanCrop Technologies',
      "biomassDetails": {
        "source": 'Sugarcane leaves',
        "weight": '1500 kg',
      },
      "date": '2024-03-17',
      "vehicleType": 'Toyota Hilux',
    },
    {
      "fpuName": 'BioCycle Innovations',
      "biomassDetails": {
        "source": 'Coconut husk',
        "weight": '2200 kg',
      },
      "date": '2024-03-18',
      "vehicleType": 'Mitsubishi Triton',
    },
    {
      "fpuName": 'SustainableAgro Solutions',
      "biomassDetails": {
        "source": 'Rubber tree bark',
        "weight": '1700 kg',
      },
      "date": '2024-03-19',
      "vehicleType": 'Ford Ranger',
    },
    {
      "fpuName": 'RegenEarth Tech',
      "biomassDetails": {
        "source": 'Corn stalks',
        "weight": '2100 kg',
      },
      "date": '2024-03-20',
      "vehicleType": 'Chevrolet Silverado',
    },
    {
      "fpuName": 'EcoCycle Systems',
      "biomassDetails": {
        "source": 'Wheat straw',
        "weight": '1600 kg',
      },
      "date": '2024-03-21',
      "vehicleType": 'Honda Ridgeline',
    },
    {
      "fpuName": 'CarbonFarm Innovations',
      "biomassDetails": {
        "source": 'Algae biomass',
        "weight": '1300 kg',
      },
      "date": '2024-03-22',
      "vehicleType": 'Toyota Tacoma',
    },
    {
      "fpuName": 'CleanGreen Solutions',
      "biomassDetails": {
        "source": 'Mulberry leaves',
        "weight": '1900 kg',
      },
      "date": '2024-03-23',
      "vehicleType": 'Ram 1500',
    },
    {
      "fpuName": 'AgriRenew Technologies',
      "biomassDetails": {
        "source": 'Cotton stalks',
        "weight": '1750 kg',
      },
      "date": '2024-03-24',
      "vehicleType": 'GMC Canyon',
    },
  ]);


  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavbar />
      <SearchBar type="Collection" />
    <div className="grid grid-cols-3  w-full gap-6 p-6">
            {FPUData.map((item, index) => (
              <CollectionCard fpuData={item} key={index}/>
            ))}
      </div>
    </div>
    )
}

export default Collection