import React, { useState } from 'react';
import { Copy, Thermometer, Camera, Video, CircleAlert, CheckCircle2, XCircle } from 'lucide-react';
import { ProductionData } from '@/types';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

// Function to determine badge color based on status
const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case 'In Progress':
      return 'bg-green-100 text-green-800 hover:bg-green-200';
    case 'Completed':
      return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
    case 'Blocked':
      return 'bg-red-100 text-red-800 hover:bg-red-200';
    case 'Unassigned':
      return 'bg-[#4B5563] text-[#F9FAFB] hover:bg-[#6B7280]';
    default:
      return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
  }
};

// Function to determine assessment icon and color
const getAssessmentIcon = (assessment: string) => {
  switch (assessment) {
    case 'Approved':
      return { icon: <CheckCircle2 className="w-5 h-5 text-green-500" />, text: 'Approved' };
    case 'Rejected':
      return { icon: <XCircle className="w-5 h-5 text-red-500" />, text: 'Rejected' };
    case 'Unassessed':
      return { icon: <CircleAlert className="w-5 h-5 text-yellow-500" />, text: 'Unassessed' };
    default:
      return { icon: <CircleAlert className="w-5 h-5 text-gray-500" />, text: 'Unassessed' };
  }
};

interface ProcessCardProps {
  process: ProductionData;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
}

export const ProductionCard: React.FC<ProcessCardProps> = ({ process }) => {
  // @ts-ignore
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  // @ts-ignore
  const [selectedMediaType, setSelectedMediaType] = useState<'thermometer' | 'video' | 'additionalImages' | null>(null);
  const [loadedMedia, setLoadedMedia] = useState<Record<string, boolean>>({});

  const handleMediaLoad = (url: string) => {
    setLoadedMedia((prev) => ({ ...prev, [url]: true }));
  };

  const handleMediaClick = (mediaUrl: string, type: 'thermometer' | 'video' | 'additionalImages') => {
    setSelectedMedia(mediaUrl);
    setSelectedMediaType(type);
  };

  return (
      <Card className="w-full max-w-md mx-auto sm:max-w-lg lg:max-w-xl">
        <CardHeader className="p-6 space-y-1.5">
          <div className="flex flex-col space-y-1.5">
            {/* Title */}
            <CardTitle className="text-2xl mb-2 font-bold text-center tracking-tight">{process.biomassName}</CardTitle>

            {/* Date and Status */}
            <div className="flex items-center justify-between">
              {/* Date */}
              <p className="text-sm text-muted-foreground">{formatDate(process.date)}</p>

              {/* Status Badge */}
              <div
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-semibold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${getStatusBadgeColor(
                      process.status
                  )}`}
              >
                {process.status}
              </div>

              {/* Assessment Indicator */}
              <div className="flex flex-col items-center">
                {getAssessmentIcon(process.assessment).icon}
                <p className="mt-1 text-sm">{getAssessmentIcon(process.assessment).text}</p>
              </div>
            </div>
          </div>

          {/* Start Time */}
          <CardDescription className="text-md text-black font-bold mt-6">
            {`${process.startTime} - ${process.status}`}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between rounded-md bg-slate-100 p-2">
              <span className="text-sm sm:text-base">Biomass Qty: {process.biomassQty}</span>
              <Button variant="ghost" size="icon">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap items-center justify-between rounded-md bg-slate-100 p-2">
              <span className="text-sm sm:text-base">Biochar Qty: {process.biocharQty}</span>
              <Button variant="ghost" size="icon">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Media Badges */}
          <div className="flex flex-wrap gap-2">
            {/* Thermometer Images Badge */}
            {process.thermometerImages.length > 0 && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Badge
                        variant="outline"
                        className="flex items-center gap-1 text-xs sm:text-sm cursor-pointer"
                        onClick={() => handleMediaClick(process.thermometerImages[0], 'thermometer')}
                    >
                      <Thermometer className="h-4 w-4" />
                      {process.mediaStatus.temperature}
                    </Badge>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Thermometer Images</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-2">
                      {process.thermometerImages.map((image, index) => (
                          <div key={index} className="relative">
                            {!loadedMedia[image] && <Skeleton className="w-full h-32 rounded-md" />}
                            <img
                                src={image}
                                alt={`Thermometer Image ${index + 1}`}
                                className={`w-full h-auto rounded-md ${!loadedMedia[image] ? 'hidden' : 'block'}`}
                                onLoad={() => handleMediaLoad(image)}
                            />
                          </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
            )}

            {/* Additional Images Badge */}
            {process.additionalImages.length > 0 && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Badge
                        variant="outline"
                        className="flex items-center gap-1 text-xs sm:text-sm cursor-pointer"
                        onClick={() => handleMediaClick(process.additionalImages[0], 'additionalImages')}
                    >
                      <Camera className="h-4 w-4" />
                      {process.mediaStatus.addImages}
                    </Badge>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Additional Images</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-2">
                      {process.additionalImages.map((image, index) => (
                          <div key={index} className="relative">
                            {!loadedMedia[image] && <Skeleton className="w-full h-32 rounded-md" />}
                            <img
                                src={image}
                                alt={`Additional Image ${index + 1}`}
                                className={`w-full h-auto rounded-md ${!loadedMedia[image] ? 'hidden' : 'block'}`}
                                onLoad={() => handleMediaLoad(image)}
                            />
                          </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
            )}

            {/* Videos Badge */}
            {process.videos.length > 0 && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Badge
                        variant="outline"
                        className="flex items-center gap-1 text-xs sm:text-sm cursor-pointer"
                        onClick={() => handleMediaClick(process.videos[0], 'video')}
                    >
                      <Video className="h-4 w-4" />
                      {process.mediaStatus.videos}
                    </Badge>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Videos</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-2">
                      {process.videos.map((video, index) => (
                          <div key={index} className="relative">
                            {!loadedMedia[video] && <Skeleton className="w-full h-48 rounded-md" />}
                            <video
                                controls
                                className={`w-full h-auto rounded-md ${!loadedMedia[video] ? 'hidden' : 'block'}`}
                                onCanPlayThrough={() => handleMediaLoad(video)}
                            >
                              <source src={video} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex flex-wrap justify-between gap-2 p-3">
          {/* View Moisture Button */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" className="text-md sm:text-md flex-1 min-w-[100px]">
                View Moisture
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Moisture Details</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {/* Moisture Content */}
                <div className="space-y-2">
                  <h4 className="font-semibold">Moisture Content:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(process.moistureContent || {})
                        .sort(([keyA], [keyB]) => {
                          const numA = parseInt(keyA.replace(/\D/g, ''));
                          const numB = parseInt(keyB.replace(/\D/g, ''));
                          return numA - numB;
                        })
                        .map(([key, value], index) => (
                            <div key={index} className="flex items-center justify-between p-2 rounded-md bg-slate-100">
                              <span className="text-sm">Moisture {key.slice(-1)}</span>
                              <span className="text-sm font-semibold">{value}%</span>
                            </div>
                        ))}
                  </div>
                </div>

                {/* Moisture Image */}
                {process.moistureImage && (
                    <div className="space-y-2">
                      <h4 className="font-semibold">Moisture Image:</h4>
                      <div className="relative">
                        {!loadedMedia[process.moistureImage] && <Skeleton className="w-full h-48 rounded-md" />}
                        <img
                            src={process.moistureImage}
                            alt="Moisture Image"
                            className={`w-full h-auto rounded-md ${!loadedMedia[process.moistureImage] ? 'hidden' : 'block'}`}
                            onLoad={() => handleMediaLoad(process.moistureImage)}
                        />
                      </div>
                    </div>
                )}
              </div>
            </DialogContent>
          </Dialog>

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

        {process.status === "In Progress" && (
            <div className="w-full rounded-md bg-red-200 px-4 py-2 text-red-500 text-xs sm:text-sm font-semibold text-center sm:text-left">
              <p>*Please upload at least {process.mediaStatus.addImages} Images, {process.mediaStatus.videos} Videos, and {process.mediaStatus.temperature} Temperature</p>
            </div>
        )}
      </Card>
  );
};