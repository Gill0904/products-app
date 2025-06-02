import api from '../api/axios';
import { LoginPayload, RegisterPayload } from '../types/auth';

export const loginRequest = async (payload: LoginPayload) => {
  const { data } = await api.post('/auth/login', payload);
  return data;
};

export const registerRequest = async (payload: RegisterPayload) => {
  const { data } = await api.post('/auth/register', payload);
  return data;
};
