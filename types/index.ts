export type Status = 'In Progress' | 'Completed' | 'Pending' | 'Blocked' | 'Unassigned';
export type Assessment = 'Approved' | 'Rejected' | 'Unassessed';


export interface MixData {
  id: number;
  date: string;
  time: string;
  imageUrl: string;
  category: string;
  type: string;
  volume: string;
  openBiochar: string;
  totalUnpackedMix: string;
  availableUnpackedMix: string;
  packagingDetails: string;
  otherMixQty: string;
  viewLink: string;
  createdAt: string;
}

export interface DistributionRecord {
  id: number;
  date: string;
  time: string;
  imageUrl: string;
  farmerName: string;
  distributionType: string;
  distributionQty: string;
  buyerName: string;
  vehicle: string;
  createdAt: string;
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
  createdAt: string;
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
  createdAt: string;
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



