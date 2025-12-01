'use client';

import { ConfigProvider } from 'antd';
import { ReactNode, useEffect, useState } from 'react';
import GlobalLoader from '@/components/GlobalLoader';

export default function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setMounted(true);
    // Simulate minimum loading time for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {!mounted || isLoading ? <GlobalLoader /> : null}
      <div style={{ display: !mounted || isLoading ? 'none' : 'block' }}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#3b82f6',
              borderRadius: 8,
            },
          }}
        >
          {children}
        </ConfigProvider>
      </div>
    </>
  );
}
