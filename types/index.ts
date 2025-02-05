export type Status = 'In Progress' | 'Completed' | 'Pending' | 'Blocked' | 'Unassigned';

export interface MediaStatus {
  temperature: number;
  images: number;
  videos: number;
}

export interface BioMassDetails {
  source: string;
  weight: string;
}

export interface FPUData {
  fpuName: string;
  biomassDetails: BioMassDetails;
  date: string;
  vehicleType: string;
}

export interface ProcessItem {
  id: string;
  name: string;
  date: string;
  status: Status;
  timeStatus: string;
  biomassQty: string;
  biocharQty: string;
  approved: boolean;
  rejected?: boolean;
  mediaStatus: MediaStatus;
}

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export interface FilterState {
  search: string;
  dateRange: DateRange;
  status?: Status;
}

export type NavItems = 'Collection'|'Production'|'Mixing'|'Distribution';