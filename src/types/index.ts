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
  isPublished?: boolean;
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
  isActive?: boolean;
  isPublished?: boolean;
  sortOrder?: number;
  createdAt: string;
}

export interface EventItem {
  id: string;
  title: string;
  slug: string;
  type: 'Webinar' | 'Seminar' | 'Workshop' | 'Bootcamp';
  mode: 'Online' | 'Offline' | 'Hybrid';
  status: 'Upcoming' | 'Ongoing' | 'Completed';
  eventDate: string;
  eventTime?: string;
  duration?: string;
  bannerUrl?: string;
  description: string;
  agenda?: string[];
  speakerName?: string;
  speakerTitle?: string;
  speakerCompany?: string;
  venueOrPlatform?: string;
  locationOrPlatform?: string;
  registrationUrl?: string;
  targetAudience?: string[];
  isFeatured?: boolean;
  isPublished?: boolean;
  isRegistrationOpen?: boolean;
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  caption?: string;
  location?: string;
  eventDate?: string;
  isFeatured?: boolean;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  studentName: string;
  roleOrCollege: string;
  content: string;
  avatarUrl?: string;
  companyOrCollegeLogo?: string;
  rating?: number;
  courseAttended?: string;
  isPublished?: boolean;
  displayOrder?: number;
  createdAt: string;
}

export interface PartnerReview {
  id: string;
  partnerName: string;
  partnerLogo?: string;
  reviewerName: string;
  reviewerDesignation: string;
  reviewContent: string;
  isPublished: boolean;
  displayOrder: number;
  createdAt: string;
}

export interface Achievement {
  id: string;
  metricValue: string;
  metricLabel: string;
  description?: string;
  icon?: string;
  displayOrder: number;
}

export interface EnquiryPayload {
  fullName: string;
  email: string;
  phone: string;
  collegeOrCompany?: string;
  collegeOrInstitution?: string;
  enquiryType?: string;
  interestedCourse?: string;
  preferredMode?: string;
  preferredLearningMode?: string;
  message?: string;
  courseInterest?: string;
}

export interface ContactPayload {
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

// ─── AUTH & RBAC TYPES ──────────────────────────────────────────────────────

export type UserRole = 'ROOKIE' | 'TUTOR';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  avatarUrl?: string;
  phoneNumber?: string;
  collegeName?: string;
  isActive: boolean;
  googleId?: string;
  createdAt: string;
  updatedAt: string;
  enrollmentsCount?: number;
}

export type EnrollmentStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'ACTIVE'
  | 'COMPLETED'
  | 'CANCELLATION_REQUESTED'
  | 'CANCELLED';

export interface CourseEnrollment {
  id: string;
  userId: string;
  user?: User;
  courseId: string;
  course?: Course;
  status: EnrollmentStatus;
  cancellationReason?: string;
  cancelledAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProgramEnrollment {
  id: string;
  userId: string;
  user?: User;
  programId: string;
  program?: Program;
  status: EnrollmentStatus;
  cancellationReason?: string;
  cancelledAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EventRegistration {
  id: string;
  userId: string;
  user?: User;
  eventId: string;
  event?: EventItem;
  status: EnrollmentStatus;
  cancellationReason?: string;
  cancelledAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TutorDashboardOverview {
  metrics: {
    totalRookies: number;
    totalCourses: number;
    publishedCourses: number;
    totalPrograms: number;
    activePrograms: number;
    totalEvents: number;
    upcomingEvents: number;
    totalEnrollments: number;
    totalCourseEnrollments: number;
    totalProgramEnrollments: number;
    totalEventRegistrations: number;
  };
  recentActivity: {
    courses: CourseEnrollment[];
    programs: ProgramEnrollment[];
    events: EventRegistration[];
  };
}
