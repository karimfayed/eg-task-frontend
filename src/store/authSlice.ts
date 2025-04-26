import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '../services/authApi';
import { AuthState } from '../types/auth.types';

const accessTokenKey = "accessToken"
const RefreshTokenKey = "refreshToken"

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
};

try {
  const storedAccessToken = localStorage.getItem(accessTokenKey);
  const storedRefreshToken = localStorage.getItem(RefreshTokenKey);
  
  if (storedAccessToken && storedRefreshToken) {
    initialState.accessToken = storedAccessToken;
    initialState.refreshToken = JSON.parse(storedRefreshToken);
    initialState.isAuthenticated = true;
  }
} catch (error) {
  console.error('Failed to parse stored auth data:', error);
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem(accessTokenKey);
      localStorage.removeItem(RefreshTokenKey);
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          state.accessToken = payload.body.result.accessToken;
          state.refreshToken = payload.body.result.refreshToken;
          state.isAuthenticated = true;
          localStorage.setItem(accessTokenKey, payload.body.result.accessToken);
          localStorage.setItem(RefreshTokenKey, payload.body.result.refreshToken);
        }
      )
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;