// import type { ApiResponse, OverallAnalyticsData, AnalyticsParams } from '@/types';

// class AnalyticsService {
//   /**
//    * Fetch overall analytics data via Next.js API route
//    */
//   async getOverallAnalytics(
//     params: AnalyticsParams
//   ): Promise<ApiResponse<OverallAnalyticsData>> {
//     try {
//       // Call Next.js API route (NOT backend directly!)
//       const url = `/analytics/overall_analytics?start_date=${params.start_date}&end_date=${params.end_date}`;

//       console.log('✅ Fetching from Next.js API route:', url);

//       const response = await fetch(url, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json',
//         },
//         cache: 'no-store',
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
//       }

//       const data = await response.json();
      
//       console.log('✅ Analytics data received successfully');
      
//       return data;
      
//     } catch (error) {
//       console.error('❌ Analytics Service Error:', error);
//       throw error;
//     }
//   }
// }

// export const analyticsService = new AnalyticsService();