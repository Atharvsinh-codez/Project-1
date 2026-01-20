// Define the shape of your backend standard response (based on your Send.success usage)
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
}

// Login Inputs & Outputs
export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResponse {
  id: string;
  name: string;
  email: string;
  token: string;
}

// Register Inputs
export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role?: string;
}
