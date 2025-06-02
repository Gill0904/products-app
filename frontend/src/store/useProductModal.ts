import { create } from 'zustand';
import { Product } from '../models/product';

interface ProductModalState {
  isOpen: boolean;
  product: Product | null;
  openModal: (product?: Product) => void;
  closeModal: () => void;
}

export const useProductModal = create<ProductModalState>((set) => ({
  isOpen: false,
  product: null,
  openModal: (product?: Product) => set({ isOpen: true, product }),
  closeModal: () => set({ isOpen: false, product: null }),
}));
