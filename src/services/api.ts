import axios from 'axios';
import {
  Course,
  Category,
  Program,
  EventItem,
  GalleryItem,
  Testimonial,
  PartnerReview,
  Achievement,
  EnquiryPayload,
  ContactPayload,
  User,
  CourseEnrollment,
  ProgramEnrollment,
  EventRegistration,
  TutorDashboardOverview,
} from '../types';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Interceptor to attach Authorization Bearer token from localStorage
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('karpi_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const api = {
  // ─── AUTHENTICATION ────────────────────────────────────────────────────────
  googleAuth: async (idToken: string) => {
    const res = await apiClient.post<{ user: User; accessToken: string; refreshToken: string }>('/auth/google', { idToken });
    return res.data;
  },
  tutorLogin: async (credentials: { username: string; password: string }) => {
    const res = await apiClient.post<{ user: User; accessToken: string; refreshToken: string }>('/auth/tutor/login', credentials);
    return res.data;
  },
  getMe: async () => {
    const res = await apiClient.get<User>('/auth/me');
    return res.data;
  },

  // ─── ROOKIE ENROLLMENTS ───────────────────────────────────────────────────
  enrollCourse: async (courseId: string) => {
    const res = await apiClient.post<CourseEnrollment>(`/enrollments/courses/${courseId}`);
    return res.data;
  },
  enrollProgram: async (programId: string) => {
    const res = await apiClient.post<ProgramEnrollment>(`/enrollments/programs/${programId}`);
    return res.data;
  },
  registerEvent: async (eventId: string) => {
    const res = await apiClient.post<EventRegistration>(`/enrollments/events/${eventId}`);
    return res.data;
  },
  getMyEnrollments: async () => {
    const res = await apiClient.get<{
      courses: CourseEnrollment[];
      programs: ProgramEnrollment[];
      events: EventRegistration[];
    }>('/enrollments/my');
    return res.data;
  },
  cancelCourseEnrollment: async (id: string, reason?: string) => {
    const res = await apiClient.post(`/enrollments/courses/${id}/cancel`, { reason });
    return res.data;
  },
  cancelProgramEnrollment: async (id: string, reason?: string) => {
    const res = await apiClient.post(`/enrollments/programs/${id}/cancel`, { reason });
    return res.data;
  },
  cancelEventRegistration: async (id: string, reason?: string) => {
    const res = await apiClient.post(`/enrollments/events/${id}/cancel`, { reason });
    return res.data;
  },
  updateRookieProfile: async (data: { phoneNumber?: string; collegeName?: string }) => {
    const res = await apiClient.patch<User>('/rookies/me/profile', data);
    return res.data;
  },

  // ─── TUTOR CORPORATE DASHBOARD & MANAGEMENT ───────────────────────────────
  getTutorOverview: async () => {
    const res = await apiClient.get<TutorDashboardOverview>('/tutor/dashboard/overview');
    return res.data;
  },
  getAllEnrollments: async () => {
    const res = await apiClient.get<{
      courses: CourseEnrollment[];
      programs: ProgramEnrollment[];
      events: EventRegistration[];
    }>('/enrollments/all');
    return res.data;
  },
  updateEnrollmentStatus: async (type: 'course' | 'program' | 'event', id: string, status: string) => {
    const res = await apiClient.patch(`/enrollments/${type}/${id}/status`, { status });
    return res.data;
  },
  getRookies: async (params?: { search?: string; status?: string }) => {
    const res = await apiClient.get<User[]>('/rookies', { params });
    return res.data;
  },
  getRookieDetail: async (id: string) => {
    const res = await apiClient.get<User & { courses: CourseEnrollment[]; programs: ProgramEnrollment[]; events: EventRegistration[] }>(`/rookies/${id}`);
    return res.data;
  },
  updateRookieStatus: async (id: string, isActive: boolean) => {
    const res = await apiClient.patch(`/rookies/${id}/status`, { isActive });
    return res.data;
  },

  // ─── TUTOR CONTENT CRUD ───────────────────────────────────────────────────
  createCourse: async (data: Partial<Course>) => {
    const res = await apiClient.post<Course>('/courses', data);
    return res.data;
  },
  updateCourse: async (id: string, data: Partial<Course>) => {
    const res = await apiClient.patch<Course>(`/courses/${id}`, data);
    return res.data;
  },
  deleteCourse: async (id: string) => {
    const res = await apiClient.delete(`/courses/${id}`);
    return res.data;
  },

  createProgram: async (data: Partial<Program>) => {
    const res = await apiClient.post<Program>('/programs', data);
    return res.data;
  },
  updateProgram: async (id: string, data: Partial<Program>) => {
    const res = await apiClient.patch<Program>(`/programs/${id}`, data);
    return res.data;
  },
  deleteProgram: async (id: string) => {
    const res = await apiClient.delete(`/programs/${id}`);
    return res.data;
  },

  createEvent: async (data: Partial<EventItem>) => {
    const res = await apiClient.post<EventItem>('/events', data);
    return res.data;
  },
  updateEvent: async (id: string, data: Partial<EventItem>) => {
    const res = await apiClient.patch<EventItem>(`/events/${id}`, data);
    return res.data;
  },
  deleteEvent: async (id: string) => {
    const res = await apiClient.delete(`/events/${id}`);
    return res.data;
  },

  createTestimonial: async (data: Partial<Testimonial>) => {
    const res = await apiClient.post<Testimonial>('/testimonials', data);
    return res.data;
  },
  updateTestimonial: async (id: string, data: Partial<Testimonial>) => {
    const res = await apiClient.patch<Testimonial>(`/testimonials/${id}`, data);
    return res.data;
  },
  deleteTestimonial: async (id: string) => {
    const res = await apiClient.delete(`/testimonials/${id}`);
    return res.data;
  },

  getPartnerReviews: async () => {
    const res = await apiClient.get<PartnerReview[]>('/partner-reviews');
    return res.data;
  },
  getAllPartnerReviewsAdmin: async () => {
    const res = await apiClient.get<PartnerReview[]>('/partner-reviews/admin/all');
    return res.data;
  },
  createPartnerReview: async (data: Partial<PartnerReview>) => {
    const res = await apiClient.post<PartnerReview>('/partner-reviews', data);
    return res.data;
  },
  updatePartnerReview: async (id: string, data: Partial<PartnerReview>) => {
    const res = await apiClient.patch<PartnerReview>(`/partner-reviews/${id}`, data);
    return res.data;
  },
  deletePartnerReview: async (id: string) => {
    const res = await apiClient.delete(`/partner-reviews/${id}`);
    return res.data;
  },

  // ─── PUBLIC BROWSING ─────────────────────────────────────────────────────
  getCourses: async (params?: { category?: string; level?: string; mode?: string; search?: string; featured?: string }) => {
    const res = await apiClient.get<Course[]>('/courses', { params });
    return res.data;
  },
  getCourseBySlug: async (slug: string) => {
    const res = await apiClient.get<Course>(`/courses/${slug}`);
    return res.data;
  },
  getCategories: async () => {
    const res = await apiClient.get<Category[]>('/courses/categories');
    return res.data;
  },
  getRelatedCourses: async (slug: string, categoryId?: string) => {
    const res = await apiClient.get<Course[]>(`/courses/${slug}/related`, { params: { categoryId } });
    return res.data;
  },
  getPrograms: async () => {
    const res = await apiClient.get<Program[]>('/programs');
    return res.data;
  },
  getProgramBySlug: async (slug: string) => {
    const res = await apiClient.get<Program>(`/programs/${slug}`);
    return res.data;
  },
  getEvents: async (params?: { type?: string; mode?: string; status?: string; search?: string }) => {
    const res = await apiClient.get<EventItem[]>('/events', { params });
    return res.data;
  },
  getUpcomingEvents: async () => {
    const res = await apiClient.get<EventItem[]>('/events/upcoming');
    return res.data;
  },
  getEventBySlug: async (slug: string) => {
    const res = await apiClient.get<EventItem>(`/events/${slug}`);
    return res.data;
  },
  getGallery: async (category?: string) => {
    const res = await apiClient.get<GalleryItem[]>('/gallery', { params: { category } });
    return res.data;
  },
  getTestimonials: async (featured?: boolean) => {
    const res = await apiClient.get<Testimonial[]>('/testimonials', { params: { featured: featured ? 'true' : undefined } });
    return res.data;
  },
  getAchievements: async () => {
    const res = await apiClient.get<Achievement[]>('/achievements');
    return res.data;
  },
  submitEnquiry: async (payload: EnquiryPayload) => {
    const res = await apiClient.post('/enquiries', payload);
    return res.data;
  },
  submitContact: async (payload: ContactPayload) => {
    const res = await apiClient.post('/contact', payload);
    return res.data;
  },
};
