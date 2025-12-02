'use client';

import Header from './Header';
import StatsCards from './StatsCards';
import ActiveUsersChart from './ActiveUsersChart';
import UsersTable from './UsersTable';
import UserAnalytics from './UserAnalytics';
import { mockUsers } from '@/lib/data';
import { useDashboardFilters } from '@/hooks/useDashboardFilters';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useUserAnalytics } from '@/hooks/useUserAnalytics';
import { Spin, Alert } from 'antd';
import ExternalApisCard from './ExternalApisCard';

export default function Dashboard() {
  const {
    selectedUser,
    setSelectedUser,
    dateRange,
    setDateRange,
    filteredUsers,
  } = useDashboardFilters(mockUsers);

  // Fetch analytics data from API
  const { chartData, stats, loading, error, externalDailyArray, externalTotals, externalLoading, externalError } = useAnalytics(dateRange);
  const { stageAnalytics, stagesArray, userDataRows, userOverallRows, chartData: userChartData, loading: userLoading, error: userError } = useUserAnalytics(dateRange, selectedUser);

  // Extract actual user IDs from API data
  const userIdList = userDataRows?.map(row => row.userId).filter(Boolean) || [];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
      <Header
        userIds={userIdList}
        selectedUser={selectedUser}
        onUserChange={setSelectedUser}
        onDateChange={setDateRange}
      />

      <div className="flex justify-center w-full mt-12!">
        <main className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading && (
            <div className="flex justify-center items-center py-20 animate-fade-in">
              <div className="flex flex-col items-center gap-4">
                <Spin size="large" />
                <p className="text-gray-500 text-sm animate-pulse">Loading analytics...</p>
              </div>
            </div>
          )}

          {error && (
            <Alert
              message="Error"
              description={error}
              type="error"
              showIcon
              className="mb-6 animate-shake"
            />
          )}

          {!loading && !error && (
            <div className="flex flex-col gap-6 animate-fade-in">
              <StatsCards stats={stats} />
              <ActiveUsersChart data={chartData} />

              {/* User stage analytics */}
              {!userLoading && !userError && stageAnalytics && (
                <UserAnalytics stages={stagesArray} userRows={userDataRows} userOverallRows={userOverallRows} chartData={userChartData} selectedUser={selectedUser} onSelectUser={setSelectedUser} />
              )}

              <UsersTable users={filteredUsers} selectedUser={selectedUser} onSelectUser={setSelectedUser} />

              {/* External APIs analytics - shown after Per-user Detailed Metrics */}
              {(externalTotals || externalLoading || externalError) && (
                <ExternalApisCard totals={externalTotals} dailyArray={externalDailyArray} loading={externalLoading} error={externalError} dateRange={dateRange} />
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}