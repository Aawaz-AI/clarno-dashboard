// import { create } from 'zustand';
// import { analyticsService } from '@/services/analyticsService';
// import { getDefaultDateRange } from '@/lib/dateUtils';
// import type {
//   OverallAnalyticsData,
//   AnalyticsParams,
//   DailyData,
// } from '../types';
// import type { ChartData } from '@/types';

// // Analytics Store
// // Zustand store for managing analytics state
 

// interface AnalyticsState {
//   // Data
//   analyticsData: OverallAnalyticsData | null;
//   chartData: ChartData[];
  
//   // Filters
//   dateRange: [string, string];
  
//   // UI State
//   isLoading: boolean;
//   error: string | null;
  
//   // Actions
//   fetchAnalytics: (params?: Partial<AnalyticsParams>) => Promise<void>;
//   setDateRange: (range: [string, string] | null) => void;
//   clearError: () => void;
//   resetFilters: () => void;
// }

// // Transform API daily data to chart data format

// const transformToChartData = (dailyData: DailyData[]): ChartData[] => {
//   return dailyData.map(item => ({
//     date: item.date,
//     activeUsers: item.active_users_count,
//   }));
// };

// export const useAnalyticsStore = create<AnalyticsState>((set, get) => ({
//   // Initial State
//   analyticsData: null,
//   chartData: [],
//   dateRange: getDefaultDateRange(),
//   isLoading: false,
//   error: null,

//   // Fetch Analytics
//   fetchAnalytics: async (params) => {
//     set({ isLoading: true, error: null });

//     try {
//       const { dateRange } = get();
//       const requestParams: AnalyticsParams = {
//         start_date: params?.start_date || dateRange[0],
//         end_date: params?.end_date || dateRange[1],
//       };

//       console.log('Fetching analytics with params:', requestParams);

//       const response = await analyticsService.getOverallAnalytics(requestParams);

//       if (response.success) {
//         const chartData = transformToChartData(
//           response.data.active_users.daily_data
//         );

//         set({
//           analyticsData: response.data,
//           chartData,
//           isLoading: false,
//         });

//         console.log('Analytics data loaded successfully');
//       } else {
//         throw new Error(response.message || 'Failed to fetch analytics');
//       }
//     } catch (error) {
//       const errorMessage = error instanceof Error 
//         ? error.message 
//         : 'An unexpected error occurred';
      
//       console.error('Failed to fetch analytics:', error);
      
//       set({
//         error: errorMessage,
//         isLoading: false,
//         analyticsData: null,
//         chartData: [],
//       });
//     }
//   },

//   // Set Date Range
//   setDateRange: (range) => {
//     if (range) {
//       set({ dateRange: range });
//       get().fetchAnalytics({
//         start_date: range[0],
//         end_date: range[1],
//       });
//     } else {
//       const defaultRange = getDefaultDateRange();
//       set({ dateRange: defaultRange });
//       get().fetchAnalytics({
//         start_date: defaultRange[0],
//         end_date: defaultRange[1],
//       });
//     }
//   },

//   // Reset Filters
//   resetFilters: () => {
//     const defaultRange = getDefaultDateRange();
//     set({
//       dateRange: defaultRange,
//     });
//     get().fetchAnalytics({
//       start_date: defaultRange[0],
//       end_date: defaultRange[1],
//     });
//   },

//   // Clear Error
//   clearError: () => {
//     set({ error: null });
//   },
// }));