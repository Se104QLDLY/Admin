import axiosClient from './axiosClient';

export interface MonthlySalesItem {
  month: string;
  amount: number;
}

export interface DebtAgingBuckets {
  '0-30': number;
  '31-60': number;
  '61-90': number;
  '90+': number;
}

export interface DebtReportItem {
  agency_id: number;
  agency_name: string;
  total_debt: number;
  aging_buckets: DebtAgingBuckets;
}

// Fetch monthly sales data
export const getMonthlySales = async (): Promise<MonthlySalesItem[]> => {
  const { data } = await axiosClient.get<{ month: string; total_revenue: number }[]>('/finance/debts/sales/');
  return data.map(item => ({
    month: item.month,
    amount: item.total_revenue,
  }));
};

// Fetch debt report data
export const getDebtReport = async (): Promise<DebtReportItem[]> => {
  // Backend may return a single object or an array; normalize to array
  const response = await axiosClient.get<DebtReportItem | DebtReportItem[]>('/finance/debts/aging/');
  const data = response.data;
  return Array.isArray(data) ? data : [data];
};

// Fetch total number of agencies
export const getAgenciesCount = async (): Promise<number> => {
  const { data } = await axiosClient.get<{ count: number }>('/agency/', { params: { limit: 1 } });
  return data.count;
}; 