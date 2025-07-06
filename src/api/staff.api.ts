import axiosClient from './axiosClient';

export interface StaffItem {
  id: number;
  name: string;
}

// Fetch staff list (users with staff role)
export const getStaffList = async (): Promise<StaffItem[]> => {
  const { data } = await axiosClient.get<{ count: number; next: string | null; previous: string | null; results: { user_id: number; full_name: string }[] }>('/users/', {
    params: { 'account__account_role': 'staff', limit: 100 }
  });
  return data.results.map(u => ({ id: u.user_id, name: u.full_name }));
}; 