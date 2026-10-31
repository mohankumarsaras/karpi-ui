import axios from 'axios';
import { Course, Category, Program, EventItem, GalleryItem, Testimonial, Achievement, EnquiryPayload, ContactPayload } from '../types';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const api = {
  // Courses
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

  // Programs
  getPrograms: async () => {
    const res = await apiClient.get<Program[]>('/programs');
    return res.data;
  },
  getProgramBySlug: async (slug: string) => {
    const res = await apiClient.get<Program>(`/programs/${slug}`);
    return res.data;
  },

  // Events
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

  // Gallery
  getGallery: async (category?: string) => {
    const res = await apiClient.get<GalleryItem[]>('/gallery', { params: { category } });
    return res.data;
  },

  // Testimonials
  getTestimonials: async (featured?: boolean) => {
    const res = await apiClient.get<Testimonial[]>('/testimonials', { params: { featured: featured ? 'true' : undefined } });
    return res.data;
  },

  // Achievements
  getAchievements: async () => {
    const res = await apiClient.get<Achievement[]>('/achievements');
    return res.data;
  },

  // Enquiries & Contact
  submitEnquiry: async (payload: EnquiryPayload) => {
    const res = await apiClient.post('/enquiries', payload);
    return res.data;
  },
  submitContact: async (payload: ContactPayload) => {
    const res = await apiClient.post('/contact', payload);
    return res.data;
  },
};

