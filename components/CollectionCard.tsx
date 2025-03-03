"use client";

import { FPUData } from '@/types';
import Image from 'next/image';
import React from 'react';

interface CollectionCardProps {
  fpuData: FPUData;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

export const CollectionCard: React.FC<CollectionCardProps> = ({ fpuData }) => {
  return (
    <div className="rounded-lg border overflow-hidden bg-card text-card-foreground shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between p-4">

      {/* Top Section: FPU Name & Image */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="font-semibold text-base sm:text-lg">FPU Name</h2>
          <p className="text-sm sm:text-base">{fpuData.fpuName}</p>
        </div>
        <Image
          alt="FPU Image"
          loading="lazy"
          width={48}
          height={48}
          className="rounded-md w-12 h-12 sm:w-16 sm:h-16 object-cover"
          src={fpuData.imageUrl}
        />
      </div>

      {/* Biomass Details Section */}
      <div className="flex justify-between text-sm sm:text-base mt-3">
        <p className="font-semibold">Biomass Details</p>
        <p className="text-slate-500">{formatDate(fpuData.date)}</p>
      </div>

      {/* Bottom Section: Biomass Source, Weight & Vehicle (pushed to bottom) */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mt-auto">
        <p className="font-medium">{fpuData.biomassDetails.source}</p>
        <p className="text-sm sm:text-base">Weight: {fpuData.biomassDetails.weight}</p>

        {/* Vehicle Icon (Aligned Bottom Right on Mobile) */}
        <div className="flex items-center bg-slate-100 px-2 py-1 rounded w-fit ml-auto sm:ml-0">
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
          <span className="ml-1 text-xs sm:text-sm text-muted-foreground">
            {fpuData.vehicleType}
          </span>
        </div>
      </div>

    </div>
  );
};

