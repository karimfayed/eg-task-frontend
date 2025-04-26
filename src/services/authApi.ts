import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginDto, SignupDto } from '../types/requests.types';
import { AuthResponse } from '../types/auth.types';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/';



export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  endpoints: (builder) => ({
    signup: builder.mutation<AuthResponse, SignupDto>({
      query: (credentials) => ({
        url: 'auth/signup',
        method: 'POST',
        body: credentials,
      }),
    }),
    login: builder.mutation<AuthResponse, LoginDto>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useSignupMutation, useLoginMutation } = authApi;