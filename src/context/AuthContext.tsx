import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginWithGoogle: (idToken: string) => Promise<User>;
  loginTutor: (credentials: { username: string; password: string }) => Promise<User>;
  logout: () => void;
  updateUser: (updatedUser: User) => void;
  isRookie: boolean;
  isTutor: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initAuth() {
      const token = localStorage.getItem('karpi_token');
      if (token) {
        try {
          const profile = await api.getMe();
          setUser(profile);
        } catch (err) {
          console.error('Session expired or invalid token:', err);
          localStorage.removeItem('karpi_token');
          localStorage.removeItem('karpi_refresh_token');
          setUser(null);
        }
      }
      setLoading(false);
    }
    initAuth();
  }, []);

  const loginWithGoogle = async (idToken: string): Promise<User> => {
    const res = await api.googleAuth(idToken);
    localStorage.setItem('karpi_token', res.accessToken);
    localStorage.setItem('karpi_refresh_token', res.refreshToken);
    setUser(res.user);
    return res.user;
  };

  const loginTutor = async (credentials: { username: string; password: string }): Promise<User> => {
    const res = await api.tutorLogin(credentials);
    localStorage.setItem('karpi_token', res.accessToken);
    localStorage.setItem('karpi_refresh_token', res.refreshToken);
    setUser(res.user);
    return res.user;
  };

  const logout = () => {
    localStorage.removeItem('karpi_token');
    localStorage.removeItem('karpi_refresh_token');
    setUser(null);
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const isRookie = user?.role === 'ROOKIE';
  const isTutor = user?.role === 'TUTOR';
  const isAuthenticated = Boolean(user);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginWithGoogle,
        loginTutor,
        logout,
        updateUser,
        isRookie,
        isTutor,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

