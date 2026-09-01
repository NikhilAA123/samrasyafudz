export interface Category {
  id: number;
  name: string;
  description: string | null;
  active: boolean;
  imageUrl: string | null;
}

export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  variants: ProductVariant[] | null;
  categoryId: number;
  category: Category;
  imageUrl: string | null;
  active: boolean;
}

export interface AuthResponse {
  email: string;
  token: string;
  userId: number;
  phone: string;
  fullName: string;
  role: string;
  newUser: boolean;
}

export interface RegisterPayload {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface UserProfile {
  id: number;
  phone: string;
  fullName: string | null;
  email: string | null;
  role: "CUSTOMER" | "ADMIN";
  createdAt: string;
}

export interface UpdateProfilePayload {
  fullName?: string;
  email?: string;
}

export interface Address {
  id: number;
  label: string | null;
  addressLine1: string;
  addressLine2: string | null;
  area: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
  latitude: number | null;
  longitude: number | null;
  isDefault: boolean;
}

export interface AddAddressPayload {
  label?: string;
  addressLine1: string;
  addressLine2?: string;
  area?: string | null;
  city?: string | null;
  state?: string | null;
  pincode?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  googlePlaceId?: string | null;
  isDefault?: boolean;
}

export interface ProductVariant {
  id: number;
  productId: number;
  name: string;
  price: number;
  stockQuantity: number;
  weightGrams: number;
}

export interface CartItem {
  id: number;
  productId: number;
  variantId: number;
  productName: string;
  weightGrams: number;
  unitPrice: number;
  quantity: number;
  subtotal: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface AddToCartPayload {
  productId: number;
  variantId: number;
  quantity: number;
}

export interface OrderItem {
  productId: number;
  variantId: number;
  productName: string;
  weightGrams: number;
  unitPrice: number;
  quantity: number;
  subtotal: number;
}

export type OrderStatus = "PENDING" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED";

export interface Order {
  id: number;
  addressId: number;
  status: OrderStatus;
  totalAmount: number;
  items: OrderItem[];
  createdAt: string;
}
