export type Status = 'In Progress' | 'Completed' | 'Pending' | 'Blocked' | 'Unassigned';
export type Assessment = 'Approved' | 'Rejected' | 'Unassessed';


export interface MixData {
  id: number;
  date: string;
  time: string;
  imageSrc: string;
  category: string;
  type: string;
  volume: string;
  openBiochar: string;
  totalUnpackedMix: string;
  availableUnpackedMix: string;
  packagingDetails: string;
  otherMixQty: string;
  viewLink: string;
}

export interface DistributionRecord {
  id: number;
  date: string;
  time: string;
  imageSrc: string;
  farmerName: string;
  distributionType: string;
  distributionQty: string;
  buyerName: string;
  vehicle: string;
}



export interface FPUData {
  fpuName: string;
  biomassDetails: {
    source: string;
    weight: string;
  };
  date: string;
  vehicleType: string;
  imageUrl: string;
}

export interface ProductionData {
  biomassName: string;
  date: string;
  status: Status;
  assessment: Assessment;
  startTime: string;
  biomassQty: string;
  biocharQty: string;
  moistureContent: Record<string, string>;
  moistureImage: string;
  thermometerImages: string[];
  videos: string[];
  additionalImages: string[];
  mediaStatus: {
    temperature: number;
    addImages: number;
    videos: number;
  };
}

export interface DateRange {
  startDate: Date;
  endDate: Date;
}



