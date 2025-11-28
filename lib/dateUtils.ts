import dayjs from 'dayjs';

// Get yesterday's date in YYYY-MM-DD format
export const getYesterdayDate = (): string => {
  return dayjs().subtract(1, 'day').format('YYYY-MM-DD');
};

// Get today's date in YYYY-MM-DD format
export const getTodayDate = (): string => {
  return dayjs().format('YYYY-MM-DD');
};

// Get default date range (last 30 days to today for better data visibility)
export const getDefaultDateRange = (): [string, string] => {
  return [
    dayjs().subtract(30, 'day').format('YYYY-MM-DD'),
    dayjs().format('YYYY-MM-DD')
  ];
};

// Log current dates for debugging
if (typeof window !== 'undefined') {
  console.log('Date Utils:', {
    today: getTodayDate(),
    yesterday: getYesterdayDate(),
    defaultRange: getDefaultDateRange(),
  });
}