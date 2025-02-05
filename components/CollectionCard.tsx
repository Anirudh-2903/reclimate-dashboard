// src/components/fpuData/ProcessCard.tsx

import { FPUData } from '@/types';
import Image from 'next/image';
import React from 'react';

interface CollectionCardProps {
  fpuData: FPUData;
}

export const CollectionCard: React.FC<CollectionCardProps> = ({ fpuData }) => {

  return (
    <div className="rounded-lg border overflow-hidden flex flex-col bg-card text-card-foreground shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div className="flex-grow p-4 text-sm">
      {/* FPU Name Section */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h2 className="font-semibold">FPU Name</h2>
          <p>{fpuData.fpuName}</p>
        </div>
        <Image
          alt="FPU Image"
          loading="lazy"
          width="48"
          height="48"
          decoding="async"
          className="rounded-md"
          src="/placeholder.svg"
          style={{ color: "transparent" }}
        />
      </div>

      {/* Biomass Details Section */}
      <div className="flex justify-between mb-3">
        <p className="font-semibold">Biomass Details</p>
        <p className="text-slate-500">{fpuData.date}</p>
      </div>

      {/* Biomass Details and Vehicle Section */}
      <div className="flex items-center justify-between">
        <p className='font-medium'>{fpuData.biomassDetails.source}</p>
        <p className="mr-2">Weight: {fpuData.biomassDetails.weight}</p>
        <div className="flex items-center bg-slate-100 px-2 py-1 rounded">
          <svg
            className="w-4 h-4 text-muted-foreground"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path>
            <path d="M15 18H9"></path>
            <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path>
            <circle cx="17" cy="18" r="2"></circle>
            <circle cx="7" cy="18" r="2"></circle>
          </svg>
          <span className="ml-1 text-xs text-muted-foreground">
          {fpuData.vehicleType}
          </span>
        </div>
      </div>
    </div>
  </div>
  );
};