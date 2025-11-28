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

export default function Dashboard() {
  const {
    selectedUser,
    setSelectedUser,
    dateRange,
    setDateRange,
    filteredUsers,
  } = useDashboardFilters(mockUsers);

  // Fetch analytics data from API
  const { chartData, stats, loading, error } = useAnalytics(dateRange);
  const { stageAnalytics, stagesArray, userDataRows, userOverallRows, chartData: userChartData, loading: userLoading, error: userError } = useUserAnalytics(dateRange, selectedUser);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        users={mockUsers}
        selectedUser={selectedUser}
        onUserChange={setSelectedUser}
        onDateChange={setDateRange}
      />

      <div className="flex justify-center w-full !mt-8">
        <main className="w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 mt-2">
          {loading && (
            <div className="flex justify-center items-center py-12">
              <Spin size="large" />
            </div>
          )}

          {error && (
            <Alert
              message="Error"
              description={error}
              type="error"
              showIcon
              className="mb-6"
            />
          )}

          {!loading && !error && (
            <div className="flex flex-col gap-8">
              <StatsCards stats={stats} />
              <ActiveUsersChart data={chartData} />
              {/* User stage analytics */}
              {!userLoading && !userError && stageAnalytics && (
                <UserAnalytics stages={stagesArray} userRows={userDataRows} userOverallRows={userOverallRows} chartData={userChartData} selectedUser={selectedUser} onSelectUser={setSelectedUser} />
              )}
              <UsersTable users={filteredUsers} selectedUser={selectedUser} onSelectUser={setSelectedUser} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}