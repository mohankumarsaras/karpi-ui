import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

// Public Layout & Pages
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Courses } from './pages/Courses';
import { CourseDetails } from './pages/CourseDetails';
import { Programs } from './pages/Programs';
import { Events } from './pages/Events';

// Rookie Portal
import { RookieLayout } from './layouts/RookieLayout';
import { RookieLogin } from './pages/rookie/Login';
import { RookieDashboard } from './pages/rookie/Dashboard';
import { RookieEnrollments } from './pages/rookie/Enrollments';
import { RookieProfile } from './pages/rookie/Profile';

// Tutor Corporate Portal
import { TutorLayout } from './layouts/TutorLayout';
import { TutorLogin } from './pages/tutor/Login';
import { TutorDashboard } from './pages/tutor/Dashboard';
import { TutorCourses } from './pages/tutor/Courses';
import { TutorPrograms } from './pages/tutor/Programs';
import { TutorEvents } from './pages/tutor/Events';
import { TutorStudents } from './pages/tutor/Students';
import { TutorTestimonials } from './pages/tutor/Testimonials';
import { TutorPartnerReviews } from './pages/tutor/PartnerReviews';

const router = createBrowserRouter([
  // ─── 1. PUBLIC WEBSITE ───────────────────────────────────────────────────
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'courses', element: <Courses /> },
      { path: 'courses/:slug', element: <CourseDetails /> },
      { path: 'programs', element: <Programs /> },
      { path: 'events', element: <Events /> },
      { path: 'about', element: <About /> },
      { path: 'gallery', element: <About /> },
      { path: 'contact', element: <About /> },
    ],
  },

  // ─── 2. ROOKIE STUDENT PORTAL ────────────────────────────────────────────
  {
    path: '/rookie/login',
    element: <RookieLogin />,
  },
  {
    path: '/rookie',
    element: <ProtectedRoute requiredRole="ROOKIE" redirectTo="/rookie/login" />,
    children: [
      {
        element: <RookieLayout />,
        children: [
          { index: true, element: <Navigate to="/rookie/dashboard" replace /> },
          { path: 'dashboard', element: <RookieDashboard /> },
          { path: 'enrollments', element: <RookieEnrollments /> },
          { path: 'profile', element: <RookieProfile /> },
        ],
      },
    ],
  },

  // ─── 3. TUTOR CORPORATE ADMIN PORTAL ─────────────────────────────────────
  {
    path: '/tutor/login',
    element: <TutorLogin />,
  },
  {
    path: '/tutor',
    element: <ProtectedRoute requiredRole="TUTOR" redirectTo="/tutor/login" />,
    children: [
      {
        element: <TutorLayout />,
        children: [
          { index: true, element: <Navigate to="/tutor/dashboard" replace /> },
          { path: 'dashboard', element: <TutorDashboard /> },
          { path: 'courses', element: <TutorCourses /> },
          { path: 'programs', element: <TutorPrograms /> },
          { path: 'events', element: <TutorEvents /> },
          { path: 'students', element: <TutorStudents /> },
          { path: 'testimonials', element: <TutorTestimonials /> },
          { path: 'partner-reviews', element: <TutorPartnerReviews /> },
        ],
      },
    ],
  },

  // Fallback
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

export function App() {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'dummy-client-id';

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}
