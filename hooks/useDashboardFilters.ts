import { useState, useMemo } from 'react';
import { User } from '@/types';
import { filterUsersByDateRange, filterUserById } from '@/lib/utils';

export function useDashboardFilters(users: User[]) {
  const [selectedUser, setSelectedUser] = useState('all');
  const [dateRange, setDateRange] = useState<[string, string] | null>(null);

  const filteredUsers = useMemo(() => {
    let filtered = users;
    
    filtered = filterUserById(filtered, selectedUser);
    
    if (dateRange && dateRange[0] && dateRange[1]) {
      filtered = filterUsersByDateRange(filtered, dateRange[0], dateRange[1]);
    }
    
    return filtered;
  }, [users, selectedUser, dateRange]);

  return {
    selectedUser,
    setSelectedUser,
    dateRange,
    setDateRange,
    filteredUsers,
  };
}
