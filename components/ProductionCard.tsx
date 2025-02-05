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
    <Card>
      <CardHeader className="space-y-1">
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl">{process.name}</CardTitle>
          <Badge variant={getStatusBadgeVariant(process.status)}>
            {process.status}
          </Badge>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span>{process.date}</span>
        </div>
        <br />
          <CardDescription className="text-md text-black font-bold">{process.timeStatus}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between rounded-md bg-slate-100 p-2">
            <span>Biomass Qty: {process.biomassQty}</span>
            <Button variant="ghost" size="icon">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center justify-between rounded-md bg-slate-100 p-2">
            <span>Biochar Qty: {process.biocharQty}</span>
            <Button variant="ghost" size="icon">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex space-x-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Thermometer className="h-3 w-3" />
            {process.mediaStatus.temperature}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Camera className="h-3 w-3" />
            {process.mediaStatus.images}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Video className="h-3 w-3" />
            {process.mediaStatus.videos}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost">View Moisture</Button>
        <Button variant="ghost">Add Details</Button>
        <Button
          variant="ghost"
          className={process.status === 'Completed' ? 'text-muted-foreground' : 'text-destructive'}
        >
          {process.status === 'Completed' ? 'Completed' : 'End Process'}
        </Button>
      </CardFooter>
      {process.status === "Completed" ? (<></>) : (
        <div className="w-[370px] rounded-md bg-red-200 mx-4 mb-4 px-4 py-1 text-red-500 text-sm font-semibold text-left">
            <p>*Please upload at least {process.mediaStatus.images} Images, {process.mediaStatus.videos} Videos and {process.mediaStatus.temperature} Temperature</p>
          </div>)}
    </Card>
  );
};