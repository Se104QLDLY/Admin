import axiosClient from './axiosClient';

// Types for Agency Assignment
export interface UnassignedAgent {
  user_id: number;
  full_name: string;
  email: string;
  username: string;
  phone_number?: string;
  address?: string;
  created_at: string;
}

export interface UnassignedAgentsResponse {
  count: number;
  results: UnassignedAgent[];
}

export interface AgencyAssignmentRequest {
  user_id: number;
  agency_name: string;
  agency_type_id: number;
  district_id: number;
  phone_number: string;
  address: string;
  email?: string;
  representative?: string;
}

export interface AgencyAssignmentResponse {
  message: string;
  agency_id: number;
  user_id: number;
  agency_name: string;
  assigned_at: string;
}

export interface AgencyType {
  agency_type_id: number;
  type_name: string;
  max_debt: number;
  description?: string;
}

export interface District {
  district_id: number;
  district_name: string;
  city_name: string;
  max_agencies: number;
}

// API Functions
export const agencyAssignmentApi = {
  // Get list of unassigned agents
  getUnassignedAgents: async (): Promise<UnassignedAgentsResponse> => {
    const response = await axiosClient.get('/staff-agency/unassigned-agents/');
    return response.data;
  },

  // Assign agency profile to user
  assignProfile: async (data: AgencyAssignmentRequest): Promise<AgencyAssignmentResponse> => {
    const response = await axiosClient.post('/staff-agency/assign-profile/', data);
    return response.data;
  },

  // Get agency types for dropdown
  getAgencyTypes: async (): Promise<AgencyType[]> => {
    const response = await axiosClient.get('/agency-types/');
    return response.data.results || response.data;
  },

  // Get districts for dropdown
  getDistricts: async (): Promise<District[]> => {
    const response = await axiosClient.get('/districts/');
    return response.data.results || response.data;
  },
};

export default agencyAssignmentApi; 