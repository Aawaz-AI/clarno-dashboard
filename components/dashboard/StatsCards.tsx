'use client'

import { UserOutlined, TeamOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import StatCard from '@/components/ui/StatCard';
import type { Stats } from '@/types';

interface StatsCardsProps {
  stats: Stats;
}

export default function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in mt-6">
      <div className="transform transition-all duration-500 hover:scale-105" style={{ animationDelay: '0.1s' }}>
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={<TeamOutlined className="text-blue-500" />}
          color="#1890ff"
        />
      </div>
      
      <div className="transform transition-all duration-500 hover:scale-105" style={{ animationDelay: '0.2s' }}>
        <StatCard
          title="Active Users"
          value={stats.activeUsers}
          icon={<CheckCircleOutlined className="text-green-500" />}
          color="#52c41a"
          subIcon={<UserOutlined className="text-gray-400" />}
          subLabel="Avg Daily Active"
          subValue={stats.averageDailyActive + "%"}
          subAlign="right"
        />
      </div>
      
      <div className="transform transition-all duration-500 hover:scale-105" style={{ animationDelay: '0.3s' }}>
        <StatCard
          title="Inactive Users"
          value={stats.nonActiveUsers}
          icon={<ClockCircleOutlined className="text-orange-500" />}
          color="#fa8c16"
        />
      </div>
    </div>
  );
}