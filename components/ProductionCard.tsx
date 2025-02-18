// src/components/process/ProcessCard.tsx
import React from 'react';
import { Copy, Thermometer, Camera, Video } from 'lucide-react';
import { ProcessItem } from '@/types';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProcessCardProps {
  process: ProcessItem;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);  // Parse the date string
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  // Convert the date to a long-form date without the weekday
  const longFormDate = date.toLocaleDateString('en-US', options);

  return longFormDate;
}

export const ProductionCard: React.FC<ProcessCardProps> = ({ process }) => {
  const getStatusBadgeVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'In Progress':
        return 'default';
      case 'Completed':
        return 'secondary';
      case 'Blocked':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto sm:max-w-lg lg:max-w-xl">
      <CardHeader className="space-y-1">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <CardTitle className="text-lg sm:text-xl">{process.name}</CardTitle>
          <Badge variant={getStatusBadgeVariant(process.status)} className="text-sm">
            {process.status}
          </Badge>
        </div>
        <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground">
          <span>{formatDate(process.date)}</span>
        </div>
        <br />
        <CardDescription className="text-md text-black font-bold">{process.timeStatus}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between rounded-md bg-slate-100 p-2">
            <span className="text-sm sm:text-base">Biomass Qty: {process.biomassQty} tonne</span>
            <Button variant="ghost" size="icon">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap items-center justify-between rounded-md bg-slate-100 p-2">
            <span className="text-sm sm:text-base">Biochar Qty: {process.biocharQty} Ltr.</span>
            <Button variant="ghost" size="icon">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="flex items-center gap-1 text-xs sm:text-sm">
            <Thermometer className="h-4 w-4" />
            {process.mediaStatus.temperature}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1 text-xs sm:text-sm">
            <Camera className="h-4 w-4" />
            {process.mediaStatus.images}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1 text-xs sm:text-sm">
            <Video className="h-4 w-4" />
            {process.mediaStatus.videos}
          </Badge>
        </div>
      </CardContent>

      <CardFooter className="flex flex-wrap justify-between gap-2 p-3">
        <Button variant="ghost" className="text-md sm:text-md flex-1 min-w-[100px]">
          View Moisture
        </Button>
        <Button variant="ghost" className="text-md sm:text-md flex-1 min-w-[100px]">
          Add Details
        </Button>
        <Button
          variant="ghost"
          className={`text-md sm:text-md flex-1 min-w-[100px] ${process.status === 'Completed' ? 'text-muted-foreground' : 'text-destructive'
            }`}
        >
          {process.status === 'Completed' ? 'Completed' : 'End Process'}
        </Button>
      </CardFooter>

      {process.status !== "Completed" && (
        <div className="w-full rounded-md bg-red-200 px-4 py-2 text-red-500 text-xs sm:text-sm font-semibold text-center sm:text-left">
          <p>*Please upload at least {process.mediaStatus.images} Images, {process.mediaStatus.videos} Videos, and {process.mediaStatus.temperature} Temperature</p>
        </div>
      )}

    </Card>
  );
};

