import api from '@/lib/api';
import { LoginResponse, SignupResponse } from '@/types/auth';

class AuthService {
  /**
   * Login with username and password
   */
  async login(username: string, password: string): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>('/auth/login/', {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      const err = error as { response?: { data?: { error?: string } } };
      throw new Error(err.response?.data?.error || 'Login failed');
    }
  }

  /**
   * Sign up new user
   */
  async signup(
    username: string,
    password: string,
    phoneNumber?: string
  ): Promise<SignupResponse> {
    try {
      const response = await api.post<SignupResponse>('/auth/signup/', {
        username,
        password,
        phone_number: phoneNumber || '',
      });
      return response.data;
    } catch (error) {
      console.error('Error signing up:', error);
      const err = error as { response?: { data?: { error?: string } } };
      throw new Error(err.response?.data?.error || 'Signup failed');
    }
  }
}

const authService = new AuthService();
export default authService;
