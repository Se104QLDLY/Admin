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
  const response = await axiosClient.get<any>('/finance/debts/aging/');
  const agingResponse = response.data;
  const agencies = agingResponse.agencies || [];
  return agencies.map((item: any): DebtReportItem => {
    const buckets: DebtAgingBuckets = {
      '0-30': item.aging_bucket === '0-30' ? item.debt_amount : 0,
      '31-60': item.aging_bucket === '31-60' ? item.debt_amount : 0,
      '61-90': item.aging_bucket === '61-90' ? item.debt_amount : 0,
      '90+': item.aging_bucket === '90+' ? item.debt_amount : 0,
    };
    return {
      agency_id: item.agency_id,
      agency_name: item.agency_name,
      total_debt: item.debt_amount,
      aging_buckets: buckets,
    };
  });
};

// Fetch total number of agencies
export const getAgenciesCount = async (): Promise<number> => {
  const { data } = await axiosClient.get<{ count: number }>('/agency/', { params: { limit: 1 } });
  return data.count;
}; 