import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Order {
  id: string;
  product: string;
  customer: string;
  date: string;
  status: 'Shipped' | 'Pending' | 'Cancelled';
  amount: number;
}

export interface Feedback {
  id: string;
  product: string;
  customer: string;
  rating: number;
  message: string;
  date: string;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
}

export interface AutoReplyRule {
  id: string;
  keyword: string;
  response: string;
}

interface Store {
  orders: Order[];
  feedback: Feedback[];
  autoReplyRules: AutoReplyRule[];
  
  addOrder: (order: Omit<Order, 'id'>) => void;
  updateOrder: (id: string, order: Partial<Order>) => void;
  deleteOrder: (id: string) => void;
  
  addFeedback: (feedback: Omit<Feedback, 'id'>) => void;
  
  addAutoReplyRule: (rule: Omit<AutoReplyRule, 'id'>) => void;
  updateAutoReplyRule: (id: string, rule: Partial<AutoReplyRule>) => void;
  deleteAutoReplyRule: (id: string) => void;
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      orders: [
        {
          id: '1',
          product: 'Organic Face Serum',
          customer: 'Sarah Chen',
          date: '2024-01-26',
          status: 'Shipped',
          amount: 89.99
        },
        {
          id: '2',
          product: 'Lavender Body Lotion',
          customer: 'Mike Johnson',
          date: '2024-01-25',
          status: 'Pending',
          amount: 45.50
        },
        {
          id: '3',
          product: 'Vitamin C Serum',
          customer: 'Emily Davis',
          date: '2024-01-24',
          status: 'Cancelled',
          amount: 75.00
        }
      ],
      
      feedback: [
        {
          id: '1',
          product: 'Organic Face Serum',
          customer: 'Sarah Chen',
          rating: 5,
          message: 'Amazing product! My skin has never looked better.',
          date: '2024-01-26',
          sentiment: 'Positive'
        },
        {
          id: '2',
          product: 'Lavender Body Lotion',
          customer: 'Mike Johnson',
          rating: 3,
          message: 'Good product but delivery was slow.',
          date: '2024-01-25',
          sentiment: 'Neutral'
        },
        {
          id: '3',
          product: 'Vitamin C Serum',
          customer: 'Emily Davis',
          rating: 2,
          message: 'Did not work as expected, disappointed.',
          date: '2024-01-24',
          sentiment: 'Negative'
        }
      ],
      
      autoReplyRules: [
        {
          id: '1',
          keyword: 'delivery status',
          response: 'Thank you for reaching out! To check your delivery status, please visit our tracking page at [Link] and enter your order number. We are available Monday to Friday, 9 AM to 5 PM EST.'
        },
        {
          id: '2',
          keyword: 'product refund',
          response: 'We apologize if you are not satisfied with your purchase. For refund inquiries, please review our return policy at [Link] or [Policy] or contact our support team directly. We are happy to help you with the process.'
        }
      ],
      
      addOrder: (order) => {
        const newOrder = { ...order, id: Date.now().toString() };
        set((state) => ({ orders: [...state.orders, newOrder] }));
      },
      
      updateOrder: (id, updatedOrder) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === id ? { ...order, ...updatedOrder } : order
          )
        }));
      },
      
      deleteOrder: (id) => {
        set((state) => ({
          orders: state.orders.filter((order) => order.id !== id)
        }));
      },
      
      addFeedback: (feedback) => {
        const newFeedback = { ...feedback, id: Date.now().toString() };
        set((state) => ({ feedback: [...state.feedback, newFeedback] }));
      },
      
      addAutoReplyRule: (rule) => {
        const newRule = { ...rule, id: Date.now().toString() };
        set((state) => ({ autoReplyRules: [...state.autoReplyRules, newRule] }));
      },
      
      updateAutoReplyRule: (id, updatedRule) => {
        set((state) => ({
          autoReplyRules: state.autoReplyRules.map((rule) =>
            rule.id === id ? { ...rule, ...updatedRule } : rule
          )
        }));
      },
      
      deleteAutoReplyRule: (id) => {
        set((state) => ({
          autoReplyRules: state.autoReplyRules.filter((rule) => rule.id !== id)
        }));
      }
    }),
    {
      name: 'd2c-booster-storage'
    }
  )
);