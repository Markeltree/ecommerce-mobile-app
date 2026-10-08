import { Ionicons } from '@expo/vector-icons';

export type TabType = 'home' | 'search' | 'saved' | 'cart' | 'account';

export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  images: string[];
  category: string;
  rating: number;
  reviewsCount: number;
  description: string;
  sizes: string[];
  isSaved?: boolean;
}

export interface Category {
  id: string;
  name: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  dateGroup: 'Today' | 'Yesterday' | 'Earlier';
  read: boolean;
  iconName: keyof typeof Ionicons.glyphMap;
  iconBg?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  likes: number;
}

export interface FilterOptions {
  sortBy: 'relevance' | 'popular' | 'price_low' | 'price_high' | 'rating';
  minPrice: number;
  maxPrice: number;
  selectedSize: string;
  selectedCategory: string;
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export interface AddressItem {
  id: string;
  label: 'Home' | 'Office' | 'Apartment' | 'Parents House' | string;
  fullAddress: string;
  isDefault?: boolean;
}

export interface PaymentCard {
  id: string;
  type: 'visa' | 'mastercard';
  last4: string;
  cardNumber: string;
  expiry: string;
  cvv?: string;
  cardHolder?: string;
  isDefault?: boolean;
}

export type PaymentMethodType = 'card' | 'cash' | 'apple_pay';

export interface TrackingStep {
  id: string;
  title: string;
  location: string;
  timestamp?: string;
  status: 'completed' | 'active' | 'pending';
}

export interface DriverInfo {
  name: string;
  role: string;
  avatar: string;
  phone: string;
}

export interface OrderItem {
  id: string;
  orderNumber: string;
  title: string;
  price: number;
  image: string;
  status: 'in_transit' | 'completed';
  statusLabel: string;
  date: string;
  itemCount?: number;
  rating?: number;
  trackingSteps: TrackingStep[];
  driver: DriverInfo;
}

export interface FAQItem {
  id: string;
  category: 'general' | 'account' | 'service' | 'payment';
  question: string;
  answer: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  time: string;
}

export interface UserProfile {
  fullName: string;
  email: string;
  dob: string;
  gender: string;
  phone: string;
  countryCode: string;
  avatar: string;
}
