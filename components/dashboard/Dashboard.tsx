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
import { Spin, Alert, Card, Row, Col, Statistic } from 'antd';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar, Legend } from 'recharts';

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
              {externalError && (
                <Alert className="mb-4" type="warning" title="External APIs" message={externalError} showIcon />
              )}
              {externalLoading && (
                <div className="mb-4">
                  <p className="text-sm text-gray-500">Loading external API data...</p>
                </div>
              )}
              {externalTotals && (
                <Card className="shadow-sm" title={<span className="text-lg font-semibold">External APIs</span>}>
                  <div className="px-2 py-1">
              

                    {/* Tavily API Usage */}
                    {externalTotals.tavily_usage && (
                      <div className="mb-8 p-5! bg-linear-to-br from-gray-50 to-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col gap-6">
                        <div className="flex items-center justify-between mb-8">
                          <div className="flex items-center gap-3">
                            <div className="p-3 bg-blue-100 rounded-xl">
                              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                              </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Tavily API Credits</h3>
                          </div>
      
                        </div>

                        {/* Credit Stats Grid */}
                        <div className="grid grid-cols-2 gap-6 mb-8">
                          {/* Total Credits Card */}
                          <div className="group p-6! bg-linear-to-br from-blue-50 via-blue-100 to-blue-50 rounded-xl border-2 border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 cursor-pointer">
                            <div className="flex items-start justify-between mb-3">
                              <div className="p-3 bg-blue-200 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-6 h-6 text-blue-700" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 11-2 0 1 1 0 012 0z" />
                                </svg>
                              </div>
                            </div>
                            <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">Total Credits</p>
                            <p className="text-4xl font-extrabold text-blue-900 group-hover:scale-105 transition-transform duration-300">
                              {externalTotals.tavily_usage.total_credits.toLocaleString()}
                            </p>
                          </div>

                          {/* Used Credits Card */}
                          <div className="group p-6! bg-linear-to-br from-orange-50 via-orange-100 to-orange-50 rounded-xl border-2 border-orange-200 hover:border-orange-400 hover:shadow-lg transition-all duration-300 cursor-pointer">
                            <div className="flex items-start justify-between mb-3">
                              <div className="p-3 bg-orange-200 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-6 h-6 text-orange-700" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v2a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a2 2 0 002 2h8a2 2 0 002-2H6z" clipRule="evenodd" />
                                </svg>
                              </div>
                            </div>
                            <p className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-2">Used Credits</p>
                            <p className="text-4xl font-extrabold text-orange-900 group-hover:scale-105 transition-transform duration-300">
                              {externalTotals.tavily_usage.used_credits.toLocaleString()}
                            </p>
                          </div>
                        </div>

                        {/* Progress Bar Section */}
                        <div className="mb-8 p-6! bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col gap-4">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">Usage Progress</span>
                            <span className="px-4 py-1.5 bg-linear-to-r p-3! from-blue-500 to-orange-500 rounded-full text-sm font-bold text-white shadow-md">
                              {externalTotals.tavily_usage.total_credits > 0
                                ? Math.round((externalTotals.tavily_usage.used_credits / externalTotals.tavily_usage.total_credits) * 100)
                                : 0}%
                            </span>
                          </div>
                          <div className="relative w-full h-6 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                            <div
                              className="h-full bg-linear-to-r from-blue-500 via-blue-400 to-orange-500 rounded-full transition-all duration-700 ease-out shadow-lg relative overflow-hidden"
                              style={{
                                width: `${externalTotals.tavily_usage.total_credits > 0 ? (externalTotals.tavily_usage.used_credits / externalTotals.tavily_usage.total_credits) * 100 : 0}%`,
                              }}
                            >
                              <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
                            </div>
                          </div>
                          <div className="flex justify-between items-center mt-4 px-2">
                            <span className="text-sm text-gray-600 font-medium">
                              <span className="font-bold text-green-600 text-base">{(externalTotals.tavily_usage.total_credits - externalTotals.tavily_usage.used_credits).toLocaleString()}</span> remaining
                            </span>
                            <span className="text-sm text-gray-500">
                              of <span className="font-bold text-gray-800 text-base">{externalTotals.tavily_usage.total_credits.toLocaleString()}</span> total
                            </span>
                          </div>
                        </div>
                        

                        {/* Remaining Status */}
                        <div className="group p-5! bg-linear-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-300 hover:border-green-400 hover:shadow-lg transition-all duration-300 cursor-pointer">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-300 rounded-full group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                              <svg className="w-6 h-6 text-green-800" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <p className="text-lg font-bold text-green-900 mb-1">
                                {(externalTotals.tavily_usage.total_credits - externalTotals.tavily_usage.used_credits).toLocaleString()} credits available
                              </p>
                              <p className="text-sm font-medium text-green-700">Ready for use • System operational</p>
                            </div>
                            <div className="px-3 py-1 bg-green-600 rounded-full">
                              <svg className="w-5 h-5 text-white animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}


                    <Row gutter={16} className="mb-6 mt-4!">
                      <Col span={6}>
                        <div className="p-4! bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                          <Statistic title="Reddit Calls" value={externalTotals.total_reddit_calls} />
                        </div>
                      </Col>
                      <Col span={6}>
                        <div className="p-4! bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                          <Statistic title="Tavily Calls" value={externalTotals.total_tavily_calls} />
                        </div>
                      </Col>
                      <Col span={6}>
                        <div className="p-4! bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                          <Statistic title="Gemini Calls" value={externalTotals.total_gemini_calls} />
                        </div>
                      </Col>
                      <Col span={6}>
                        <div className="p-4! bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                          <Statistic title="Total Calls" value={externalTotals.total_all_calls} />
                        </div>
                      </Col>
                    </Row>

                    <div style={{ display: 'flex', gap: 16, alignItems: 'stretch', marginTop: 24 }}>
                      <div style={{ flex: 1, height: 220 }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={externalDailyArray} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="daily_total" stroke="#1890ff" strokeWidth={2} dot={{ r: 2 }} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>

                      <div style={{ width: 420, height: 220 }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={externalDailyArray} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="reddit_total" stackId="a" fill="#2563eb" />
                            <Bar dataKey="tavily_total" stackId="a" fill="#06b6d4" />
                            <Bar dataKey="gemini_total" stackId="a" fill="#10b981" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}