export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
}

export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
export type LearningMode = 'Online Live' | 'Offline Classroom' | 'Hybrid';

export interface CurriculumModule {
  module: string;
  topics: string[];
  handsOn: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  overview: string;
  level: SkillLevel;
  mode: LearningMode;
  duration: string;
  schedule?: string;
  thumbnailUrl?: string;
  learningObjectives?: string[];
  skillsCovered?: string[];
  curriculum?: CurriculumModule[];
  prerequisites?: string[];
  whoShouldAttend?: string[];
  practicalActivities?: string[];
  isFeatured: boolean;
  category?: Category;
  categoryId?: string;
  createdAt: string;
}

export interface Program {
  id: string;
  title: string;
  slug: string;
  type: string;
  shortDescription: string;
  detailedDescription: string;
  icon?: string;
  bannerUrl?: string;
  keyHighlights?: string[];
  targetAudience?: string[];
  learningOutcomes?: string[];
  deliveryFormat?: string;
  sortOrder: number;
}

export interface EventItem {
  id: string;
  title: string;
  slug: string;
  type: 'Webinar' | 'Seminar' | 'Workshop' | 'Bootcamp';
  mode: 'Online' | 'Offline' | 'Hybrid';
  status: 'Upcoming' | 'Ongoing' | 'Completed';
  eventDate: string;
  duration?: string;
  locationOrPlatform?: string;
  description: string;
  speakerName?: string;
  speakerRole?: string;
  speakerOrg?: string;
  bannerUrl?: string;
  registrationStatus: string;
  registrationLink?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Seminars' | 'Workshops' | 'Training Sessions' | 'Student Participation' | 'Campus Visits' | 'Certifications';
  imageUrl: string;
  caption?: string;
  location?: string;
  eventDate?: string;
}

export interface Testimonial {
  id: string;
  studentName: string;
  collegeOrRole?: string;
  currentCompany?: string;
  avatarUrl?: string;
  quote: string;
  courseTaken?: string;
  rating: number;
  isFeatured: boolean;
}

export interface Achievement {
  id: string;
  metricValue: string;
  title: string;
  description?: string;
  icon?: string;
  displayOrder: number;
}

export interface EnquiryPayload {
  fullName: string;
  email: string;
  phone: string;
  collegeOrInstitution?: string;
  interestedCourse?: string;
  preferredLearningMode?: string;
  message?: string;
}

export interface ContactPayload {
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

