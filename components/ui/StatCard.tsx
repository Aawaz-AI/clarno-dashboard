import React from 'react';
import { Card, Statistic } from 'antd';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color?: string;
  subValue?: number | string;
  subLabel?: string;
  subIcon?: React.ReactNode;
  subAlign?: 'left' | 'right';
  fontSize?: string;
}

export default function StatCard({ title, value, icon, color, subValue, subLabel, subIcon, subAlign = 'left', fontSize = '40px' }: StatCardProps) {
  return (
    <Card
      className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm group overflow-hidden relative h-full"
      styles={{ body: { paddingBottom: 16, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '200px' } }}
    >
      {/* Gradient accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500" />
      
      <Statistic
        title={<span className="text-gray-600 font-medium text-sm">{title}</span>}
        value={value}
        prefix={<span className="transform group-hover:scale-110 transition-transform duration-300">{icon}</span>}
        styles={{
          content: {
            color: color || '#000000',
            fontSize: fontSize,
            fontWeight: '700',
          },
        }}
      />

      {/* Footer: optional sub value shown at bottom inside the card */}
      {(typeof subValue !== 'undefined' || subLabel) && (
        <div className={`flex items-center gap-2 text-sm text-gray-500 pt-2 ${subAlign === 'right' ? 'justify-end' : 'justify-start'}`}>
          {subIcon && <span className="opacity-90">{subIcon}</span>}
          <div>
            {subLabel && <div className="font-medium text-xs">{subLabel}</div>}
            <div className="text-sm">{subValue}</div>
          </div>
        </div>
      )}
    </Card>
  );
}