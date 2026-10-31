import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Courses } from './pages/Courses';
import { CourseDetails } from './pages/CourseDetails';
import { Programs } from './pages/Programs';
import { Events } from './pages/Events';

const router = createBrowserRouter([
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
      // Redirect or alias /gallery and /contact to /about sections
      { path: 'gallery', element: <About /> },
      { path: 'contact', element: <About /> },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
