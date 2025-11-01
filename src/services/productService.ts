import api from '@/lib/api';
import { Package, Campaign } from '@/types/product';

class ProductService {
  /**
   * Get all packages
   */
  async getPackages(): Promise<Package[]> {
    const response = await api.get<Package[] | { results?: Package[] }>('/packages/');
    if (Array.isArray(response.data)) {
      return response.data;
    }
    return response.data.results || [];
  }

  /**
   * Get package by ID
   */
  async getPackageById(id: number): Promise<Package> {
    const response = await api.get<Package>(`/packages/${id}/`);
    return response.data;
  }

  /**
   * Get all campaigns
   */
  async getCampaigns(): Promise<Campaign[]> {
    const response = await api.get<Campaign[] | { results?: Campaign[] }>('/campaigns/');
    if (Array.isArray(response.data)) {
      return response.data;
    }
    return response.data.results || [];
  }

  /**
   * Get campaign by ID
   */
  async getCampaignById(id: number): Promise<Campaign> {
    const response = await api.get<Campaign>(`/campaigns/${id}/`);
    return response.data;
  }
}

const productService = new ProductService();
export default productService;
