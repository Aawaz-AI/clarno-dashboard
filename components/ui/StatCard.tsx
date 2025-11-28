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
}

export default function StatCard({ title, value, icon, color, subValue, subLabel, subIcon, subAlign = 'left' }: StatCardProps) {
  return (
    <Card
      className="hover:shadow-lg transition-shadow"
      styles={{ body: { paddingBottom: 16, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' } }}
    >
      <Statistic
        title={title}
        value={value}
        prefix={icon}
        styles={{
          content: {
            color: color || '#000000',
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