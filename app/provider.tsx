'use client';

import { ConfigProvider } from 'antd';
import { ReactNode } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
  return (
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
  );
}
