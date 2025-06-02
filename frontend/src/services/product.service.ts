import api from '../api/axios';
import { Product } from '../models/product';

export const getProducts = async () => {
  const { data } = await api.get<Product[]>('/products');
  return data;
};

export const createProduct = async (payload: Omit<Product, 'id'>) => {
  const { data } = await api.post<Product>('/products', payload);
  return data;
};

export const updateProduct = async (id: string, payload: Omit<Product, 'id'>) => {
  const { data } = await api.put<Product>(`/products/${id}`, payload);
  return data;
};

export const deleteProduct = async (id: string) => {
  await api.delete(`/products/${id}`);
};
