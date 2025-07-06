import axiosClient from './axiosClient';

export interface AgencyItem {
  id: number;
  code: string;
  name: string;
  type: string;
  type_id: number;
  district: string;
  district_id: number;
  address: string;
  phone: string;
  email: string;
  current_debt: number;
  debt_limit: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Fetch the list of agencies with basic pagination support
export const getAgencies = async (params?: any): Promise<AgencyItem[]> => {
  const { data } = await axiosClient.get<{ count: number; next: string | null; previous: string | null; results: AgencyItem[] }>('/agency/', { params });
  return data.results;
};

// Delete an agency by ID
export const deleteAgency = async (id: number): Promise<void> => {
  await axiosClient.delete(`/agency/${id}/`);
}; 