import axiosClient from './axiosClient';

export interface ReportListItem {
  report_id: number;
  report_type: string;
  report_date: string;
  created_by: number;
  created_by_name: string;
  created_at: string;
}

export const getReports = async (): Promise<ReportListItem[]> => {
  // Fetch reports list, unwrap paginated results if necessary
  const response = await axiosClient.get('/finance/reports/');
  const respData = response.data as any;
  if (Array.isArray(respData)) {
    return respData;
  }
  // If paginated, use the 'results' field, fallback to empty array
  return Array.isArray(respData.results) ? respData.results : [];
};

// Fetch a single report's details
export interface ReportDetailItem {
  report_id: number;
  report_type: string;
  report_date: string;
  data: any;
  created_by: number;
  created_by_name: string;
  created_at: string;
}

export const getReportDetail = async (id: string): Promise<ReportDetailItem> => {
  const { data } = await axiosClient.get<ReportDetailItem>(`/finance/reports/${id}/`);
  return data;
};