
export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';

export interface Donor {
  id: string;
  name: string;
  bloodGroup: BloodGroup;
  gender: 'Male' | 'Female' | 'Other';
  age: number;
  photo: string;
  phone: string;
  district: string;
  upazila: string;
  address?: string;
  profession?: string;
  lastDonateDate: string; // ISO format
  donationCount: number; // New property
  isApproved: boolean;
  createdAt: string;
}

export interface EmergencyRequest {
  id: string;
  patientName: string;
  bloodGroup: BloodGroup;
  district: string;
  upazila: string;
  hospitalName: string;
  neededDate: string;
  contactNumber: string;
  description: string;
  status: 'Pending' | 'Resolved';
  createdAt: string;
}

export interface DonationPost {
  id: string;
  donorName: string;
  message: string;
  images: string[]; // Base64 strings
  date: string;
}

export interface AuthState {
  user: Donor | null;
  isAdmin: boolean;
}
