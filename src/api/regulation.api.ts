import axiosClient from './axiosClient';

export interface RegulationItem {
  regulation_key: string;
  regulation_value: string;
  description: string;
  updated_at: string;
}

export interface RegulationDetail extends RegulationItem {}

/**
 * Fetch all regulations.
 */
export const getRegulations = async (): Promise<RegulationItem[]> => {
  const { data } = await axiosClient.get<RegulationItem[]>('/regulation/');
  return data;
};

/**
 * Fetch a single regulation by key.
 */
export const getRegulation = async (key: string): Promise<RegulationDetail> => {
  const { data } = await axiosClient.get<RegulationDetail>(`/regulation/${key}/`);
  return data;
};

/**
 * Update a regulation by key.
 */
export const updateRegulation = async (
  key: string,
  payload: { regulation_value: string; description?: string }
): Promise<RegulationDetail> => {
  const { data } = await axiosClient.put<RegulationDetail>(`/regulation/${key}/`, payload);
  return data;
};

export interface RegulationHistoryItem {
  regulation_key: string;
  new_value: string;
  changed_by: number;
  changed_by_name: string;
  changed_at: string;
}

/**
 * Fetch regulation change history, optionally filtered by key.
 */
export const getRegulationHistory = async (
  key: string
): Promise<RegulationHistoryItem[]> => {
  const { data } = await axiosClient.get<RegulationHistoryItem[]>('/regulation/history/', {
    params: { key },
  });
  return data;
}; 