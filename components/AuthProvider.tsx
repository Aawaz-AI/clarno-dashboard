'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    
    // If not on login page and no token, redirect to login
    if (!token && pathname !== '/login') {
      router.push('/login');
    }
    
    // If on login page and has token, redirect to dashboard
    if (token && pathname === '/login') {
      router.push('/');
    }
  }, [pathname, router]);

  return <>{children}</>;
}
