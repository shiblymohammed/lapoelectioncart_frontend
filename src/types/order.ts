export interface OrderItem {
  id: number;
  item_type: 'package' | 'campaign';
  item_id: number;
  item_name: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface Order {
  id: number;
  order_number: string;
  items: OrderItem[];
  total: number;
  status: string;
  payment_status: string;
  created_at: string;
  updated_at: string;
}

export interface CreateOrderResponse {
  order_id: number;
  razorpay_order_id: string;
  amount: number;
  currency: string;
}

export interface PaymentVerificationRequest {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface PaymentVerificationResponse {
  success: boolean;
  message: string;
  order: Order;
}
