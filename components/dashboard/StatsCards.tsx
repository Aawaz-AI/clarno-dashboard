'use client'

import { UserOutlined, TeamOutlined, CheckCircleOutlined, ClockCircleOutlined, RocketOutlined, BarsOutlined, ArrowUpOutlined, CreditCardOutlined } from '@ant-design/icons';
import StatCard from '@/components/ui/StatCard';
import type { Stats } from '@/types';

interface StatsCardsProps {
  stats: Stats;
}

export default function StatsCards({ stats }: StatsCardsProps) {
  return (
    <>
      <h2 className="text-2xl font-bold heading-fade mb-4">Executive Summary</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
        {/* Core User Metrics */}
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
            subValue={Math.round(stats.averageDailyActive)}
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

        {/* Engagement & Time Metrics */}
        <div className="transform transition-all duration-500 hover:scale-105" style={{ animationDelay: '0.4s' }}>
          <StatCard
            title="Avg Session Duration"
            value={stats.avgTimePerUser ? Math.round(stats.avgTimePerUser / 60) + 'm' : 'N/A'}
            icon={<ClockCircleOutlined className="text-purple-500" />}
            color="#722ed1"
          />
        </div>

        {/* Progression & Completion */}
        <div className="transform transition-all duration-500 hover:scale-105" style={{ animationDelay: '0.5s' }}>
          <StatCard
            title="Highest Stage Reached"
            value={stats.maxStageReached || 'N/A'}
            icon={<RocketOutlined className="text-cyan-500" />}
            color="#13c2c2"
            fontSize="24px"
          />
        </div>

        <div className="transform transition-all duration-500 hover:scale-105" style={{ animationDelay: '0.6s' }}>
          <StatCard
            title="Stage Completion Rate"
            value={(stats.completionRate ?? 0) + '%'}
            icon={<BarsOutlined className="text-gold-500" />}
            color="#faad14"
            subLabel="Users Completed All Stages"
            subValue={stats.usersCompletedAllStages ?? 0}
            subAlign="right"
          />
        </div>

        {/* Conversion Metrics */}
        <div className="transform transition-all duration-500 hover:scale-105" style={{ animationDelay: '0.7s' }}>
          <StatCard
            title="Free-to-Pro Conversion"
            value={(stats.freeToProConversion ?? 0) + '%'}
            icon={<ArrowUpOutlined className="text-lime-500" />}
            color="#52c41a"
          />
        </div>

        <div className="transform transition-all duration-500 hover:scale-105" style={{ animationDelay: '0.8s' }}>
          <StatCard
            title="Paid User Conversion"
            value={(stats.paidConversion ?? 0) + '%'}
            icon={<CreditCardOutlined className="text-red-500" />}
            color="#f5222d"
          />
        </div>
      </div>
    </>
  );
}