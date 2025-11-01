export interface CartItem {
  id: number;
  item_type: 'package' | 'campaign';
  item_id: number;
  item_name: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface Cart {
  id: number;
  items: CartItem[];
  total: number;
  created_at: string;
  updated_at: string;
}

export interface AddToCartRequest {
  item_type: 'package' | 'campaign';
  item_id: number;
  quantity: number;
}
