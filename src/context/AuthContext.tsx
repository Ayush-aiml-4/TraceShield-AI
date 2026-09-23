import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'admin' | 'analyst';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organization: string;
  avatarUrl?: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  customLogoUrl: string | null;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  quickLogin: (role: UserRole) => void;
  register: (data: { name: string; email: string; organization: string; role: UserRole; password: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateCustomLogo: (url: string | null) => void;
}

const DEFAULT_USERS: User[] = [
  {
    id: 'usr-admin-1',
    name: 'Alex Vance',
    email: 'admin@traceshield.ai',
    role: 'admin',
    organization: 'TraceShield Global Defense',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    createdAt: '2026-01-15',
  },
  {
    id: 'usr-analyst-1',
    name: 'Sarah Chen',
    email: 'analyst@traceshield.ai',
    role: 'analyst',
    organization: 'CloudOps Cyber Team',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
    createdAt: '2026-02-01',
  },
];

const STORAGE_KEY_USER = 'traceshield_auth_user';
const STORAGE_KEY_LOGO = 'traceshield_custom_logo';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USER);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback if parsing fails
    }
    // Default to logged-in Admin for rich immediate UX
    return DEFAULT_USERS[0];
  });

  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_LOGO);
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY_USER);
    }
  }, [user]);

  const updateCustomLogo = (url: string | null) => {
    setCustomLogoUrl(url);
    if (url) {
      localStorage.setItem(STORAGE_KEY_LOGO, url);
    } else {
      localStorage.removeItem(STORAGE_KEY_LOGO);
    }
  };

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    // Simulated delay for realistic auth feedback
    await new Promise((res) => setTimeout(res, 400));
    
    if (!email || !pass) {
      return { success: false, error: 'Please fill in both email and password.' };
    }

    const matched = DEFAULT_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (matched) {
      setUser(matched);
      return { success: true };
    }

    // Dynamic user creation for quick login testing with any credentials
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0].toUpperCase(),
      email,
      role: email.includes('admin') ? 'admin' : 'analyst',
      organization: 'Enterprise Defense Org',
      createdAt: new Date().toISOString().split('T')[0],
    };

    setUser(newUser);
    return { success: true };
  };

  const quickLogin = (role: UserRole) => {
    const matched = DEFAULT_USERS.find((u) => u.role === role) || DEFAULT_USERS[0];
    setUser(matched);
  };

  const register = async (data: {
    name: string;
    email: string;
    organization: string;
    role: UserRole;
    password: string;
  }): Promise<{ success: boolean; error?: string }> => {
    await new Promise((res) => setTimeout(res, 500));

    if (!data.name || !data.email || !data.password) {
      return { success: false, error: 'All fields are required.' };
    }

    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: data.name,
      email: data.email,
      role: data.role,
      organization: data.organization || 'Independent Security Lab',
      createdAt: new Date().toISOString().split('T')[0],
    };

    setUser(newUser);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        customLogoUrl,
        login,
        quickLogin,
        register,
        logout,
        updateCustomLogo,
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
