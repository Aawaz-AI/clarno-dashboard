import { User, UserStats } from '@/types';

export function calculateStats(users: User[]): UserStats {
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'active').length;
  const inactiveUsers = totalUsers - activeUsers;
  const activeRate = totalUsers > 0 
    ? ((activeUsers / totalUsers) * 100).toFixed(1) 
    : '0';
  
  // Provide values for all fields defined on UserStats.
  // `nonActiveUsers` mirrors `inactiveUsers`. `averageDailyActive` is not
  // computable from the `users` array alone, so return 0 as a safe default.
  const nonActiveUsers = inactiveUsers;
  const averageDailyActive = 0;

  return { totalUsers, activeUsers, inactiveUsers, nonActiveUsers, averageDailyActive, activeRate };
}

export function filterUsersByDateRange(
  users: User[], 
  startDate: string, 
  endDate: string
): User[] {
  if (!startDate || !endDate) return users;
  
  return users.filter(user => 
    user.lastActive >= startDate && user.lastActive <= endDate
  );
}

export function filterUserById(users: User[], userId: string): User[] {
  if (userId === 'all') return users;
  return users.filter(user => user.id === parseInt(userId));
}