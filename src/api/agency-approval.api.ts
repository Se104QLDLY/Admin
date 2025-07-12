import axiosClient from './axiosClient';

// Types for Agency Approval
export interface PendingAgency {
  id: number;
  code: string;
  name: string;
  type: string;
  type_id: number;
  district: string;
  district_id: number;
  city: string;
  address: string;
  phone: string;
  email: string;
  representative: string;
  registration_date: string;
  created_at: string;
  days_pending: number;
}

export interface PendingAgenciesResponse {
  count: number;
  results: PendingAgency[];
}

export interface ApprovalRequest {
  username: string;
  password: string;
  full_name?: string;
}

export interface ApprovalResponse {
  message: string;
  agency_id: number;
  user_id: number;
  username: string;
  status: string;
  approved_at: string;
}

export interface RejectRequest {
  reason: string;
  send_email?: boolean;
}

export interface RejectResponse {
  message: string;
  agency_id: number;
  agency_name: string;
  reason: string;
  rejected_at: string;
}

// API Functions
export const agencyApprovalApi = {
  // Get list of pending agencies
  getPendingAgencies: async (): Promise<PendingAgenciesResponse> => {
    const response = await axiosClient.get('/agency/pending/');
    return response.data;
  },

  // Get agency detail by ID
  getAgencyDetail: async (agencyId: number): Promise<PendingAgency> => {
    const response = await axiosClient.get(`/agency/${agencyId}/`);
    return response.data;
  },

  // Approve agency application
  approveAgency: async (agencyId: number, data: ApprovalRequest): Promise<ApprovalResponse> => {
    const response = await axiosClient.post(`/agency/${agencyId}/approve/`, data);
    return response.data;
  },

  // Reject agency application
  rejectAgency: async (agencyId: number, data: RejectRequest): Promise<RejectResponse> => {
    const response = await axiosClient.post(`/agency/${agencyId}/reject/`, data);
    return response.data;
  },
};

export default agencyApprovalApi; 