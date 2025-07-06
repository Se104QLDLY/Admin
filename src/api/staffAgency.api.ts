import axiosClient from './axiosClient';

// Assign an agency to a staff user
export const assignAgencyToStaff = async (agencyId: number, staffId: number): Promise<void> => {
  await axiosClient.post('/staff-agency/', { agency: agencyId, staff_id: staffId });
};

// Fetch all staff-agency assignments
export const getStaffAssignments = async (): Promise<{ agency: number; staff_id: number }[]> => {
  const { data } = await axiosClient.get<{ count: number; next: string | null; previous: string | null; results: Array<{ agency: number; staff_id: number }> }>('/staff-agency/');
  return data.results;
}; 