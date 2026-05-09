import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Types
export interface College {
  id: string;
  name: string;
  slug: string;
  location: string;
  city: string;
  state: string;
  type: string;
  established: number;
  rating: number;
  totalFeesMin: number;
  totalFeesMax: number;
  imageUrl?: string;
  description: string;
  website?: string;
  naacGrade?: string;
  rankNirf?: number;
  totalStudents?: number;
  campusArea?: string;
  approved?: string;
  placements?: Placement[];
  courses?: Course[];
  reviews?: Review[];
  _count?: { courses: number };
}

export interface Course {
  id: string;
  collegeId: string;
  name: string;
  level: string;
  duration: string;
  feesPerYear: number;
  totalFees: number;
  seats: number;
  examAccepted: string[];
  eligibility?: string;
}

export interface Placement {
  id: string;
  collegeId: string;
  year: number;
  avgPackage: number;
  highestPackage: number;
  placementRate: number;
  medianPackage?: number;
  topRecruiters: string[];
}

export interface Review {
  id: string;
  collegeId: string;
  authorName: string;
  batchYear: number;
  course: string;
  rating: number;
  title: string;
  content: string;
  pros?: string;
  cons?: string;
  createdAt: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface CollegeListResponse {
  colleges: College[];
  pagination: PaginationMeta;
}

export interface CompareCollege extends College {
  best: {
    nirf: boolean;
    rating: boolean;
    fees: boolean;
    avgPackage: boolean;
    highestPackage: boolean;
    placementRate: boolean;
  };
}

export interface PredictResult {
  college: College;
  course: Course;
  chance: 'Safe' | 'Moderate' | 'Reach';
  rankRange: { min: number; max: number };
}

// API functions
export const getColleges = (params: Record<string, string | number>) =>
  api.get<CollegeListResponse>('/api/colleges', { params }).then(r => r.data);

export const getCollegeFilters = () =>
  api.get<{ states: string[]; types: string[]; courses: string[] }>('/api/colleges/filters').then(r => r.data);

export const getCollege = (id: string) =>
  api.get<College>(`/api/colleges/${id}`).then(r => r.data);

export const compareColleges = (collegeIds: string[]) =>
  api.post<{ colleges: CompareCollege[] }>('/api/compare', { collegeIds }).then(r => r.data);

export const getCompareByIds = (ids: string) =>
  api.get<{ colleges: CompareCollege[] }>(`/api/compare?ids=${ids}`).then(r => r.data);

export const predictColleges = (payload: { exam: string; rank: number; category: string }) =>
  api.post<{ results: PredictResult[]; total: number }>('/api/predict', payload).then(r => r.data);

export const getExams = () =>
  api.get<{ exams: string[]; categories: string[] }>('/api/predict/exams').then(r => r.data);

export const formatFees = (amount: number) => {
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
  return `₹${(amount / 1000).toFixed(0)}K`;
};

/**
 * Seed data stores avgPackage in LPA (e.g. 25.4) and highestPackage in Crore (e.g. 3.67).
 * Threshold: values >= 15 are displayed as LPA, values < 15 are displayed as Cr.
 */
export const formatPackage = (value: number): string => {
  if (value >= 15) return `${value.toFixed(1)} LPA`;
  return `${value.toFixed(2)} Cr`;
};
