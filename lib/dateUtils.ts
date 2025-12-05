import dayjs from 'dayjs';

export const getYesterdayDate = (): string => {
  return dayjs().subtract(1, 'day').format('YYYY-MM-DD');
};

export const getTodayDate = (): string => {
  return dayjs().format('YYYY-MM-DD');
};

export const getDefaultDateRange = (): [string, string] => {
  return [
    dayjs().subtract(30, 'day').format('YYYY-MM-DD'),
    dayjs().format('YYYY-MM-DD')
  ];
};