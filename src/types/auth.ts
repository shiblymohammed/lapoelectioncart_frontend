export interface User {
  id: number;
  username: string;
  phone_number: string;
  role: 'user' | 'staff' | 'admin';
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginResponse {
  token: string;
  user: User;
  role: string;
}

export interface SignupResponse extends LoginResponse {
  message: string;
}
