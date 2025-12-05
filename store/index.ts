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