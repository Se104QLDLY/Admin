import axiosClient from './axiosClient';

export interface UserItem {
  user_id: number;
  username: string;
  full_name: string;
  email: string;
  phone_number?: string;
  address?: string;
  account_role: 'admin' | 'staff' | 'agent';
  created_at: string;
  updated_at: string;
}

type CreateUserPayload = {
  username: string;
  password: string;
  confirm_password: string;
  full_name: string;
  email: string;
  phone_number?: string;
  address?: string;
  account_role: 'admin' | 'staff' | 'agent';
};

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

/**
 * Fetch list of all users with pagination support.
 */
export const getUsers = async (): Promise<UserItem[]> => {
  const { data } = await axiosClient.get<PaginatedResponse<UserItem>>('/users/', { params: { limit: 1000 } });
  return data.results;
};

/**
 * Delete a user by ID.
 */
export const deleteUser = async (id: number): Promise<void> => {
  await axiosClient.delete(`/users/${id}/`);
};

/**
 * Create a new user with given payload.
 */
export const createUser = async (
  payload: CreateUserPayload
): Promise<UserItem> => {
  const { data } = await axiosClient.post<UserItem>('/users/', payload);
  return data;
};

/**
 * Update an existing user by ID with given payload.
 */
export const updateUser = async (
  id: number,
  payload: Partial<Omit<UserItem, 'user_id' | 'created_at' | 'updated_at'>>
): Promise<UserItem> => {
  const { data } = await axiosClient.put<UserItem>(`/users/${id}/`, payload);
  return data;
};

/**
 * Fetch a single user by ID.
 */
export const getUser = async (id: number): Promise<UserItem> => {
  const { data } = await axiosClient.get<UserItem>(`/users/${id}/`);
  return data;
}; 