import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

interface ProtectedRouteProps {
  requiredRole?: UserRole;
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requiredRole,
  redirectTo,
}) => {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030405] flex items-center justify-center text-white">
        <div className="w-8 h-8 rounded-full border-2 border-[#1656B6] border-t-white animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    const fallback = redirectTo || (requiredRole === 'TUTOR' ? '/tutor/login' : '/rookie/login');
    return <Navigate to={fallback} replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to={user?.role === 'TUTOR' ? '/tutor/dashboard' : '/rookie/dashboard'} replace />;
  }

  return <Outlet />;
};
