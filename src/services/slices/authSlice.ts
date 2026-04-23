// src/services/slices/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi
} from '@api';
import { TRegisterData, TLoginData } from '@api'; // Типы из burger-api.ts
import { TUser } from '@utils-types';
import { setCookie, getCookie, deleteCookie } from '@utils/cookie';

type TAuthState = {
  isAuthChecked: boolean; // Флаг, что мы проверили наличие токена при старте
  user: TUser | null;
  error: string | null;
};

const initialState: TAuthState = {
  isAuthChecked: false,
  user: null,
  error: null
};

// === Async Thunks ===

// Регистрация
export const registerUser = createAsyncThunk(
  'auth/register',
  async (data: TRegisterData, { rejectWithValue }) => {
    try {
      const response = await registerUserApi(data);
      // Сохраняем токены
      localStorage.setItem('refreshToken', response.refreshToken);
      setCookie('accessToken', response.accessToken);
      return response.user;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Ошибка регистрации';
      return rejectWithValue(message);
    }
  }
);

// Логин
export const loginUser = createAsyncThunk(
  'auth/login',
  async (data: TLoginData, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(data);
      localStorage.setItem('refreshToken', response.refreshToken);
      setCookie('accessToken', response.accessToken);
      return response.user;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Ошибка входа';
      return rejectWithValue(message);
    }
  }
);

// Получение пользователя (проверка токена)
export const getUser = createAsyncThunk(
  'auth/getUser',
  async (_, { rejectWithValue }) => {
    if (!getCookie('accessToken')) {
      return rejectWithValue('No token');
    }
    try {
      const response = await getUserApi();
      return response.user;
    } catch (error: unknown) {
      // Если токен протух или неверный
      localStorage.removeItem('refreshToken');
      deleteCookie('accessToken');
      const message =
        error instanceof Error ? error.message : 'Ошибка авторизации';
      return rejectWithValue(message);
    }
  }
);

// Обновление данных
export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (data: Partial<TRegisterData>, { rejectWithValue }) => {
    try {
      const response = await updateUserApi(data);
      return response.user;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Ошибка обновления данных';
      return rejectWithValue(message);
    }
  }
);

// Выход
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      localStorage.removeItem('refreshToken');
      deleteCookie('accessToken');
      return null;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Ошибка выхода';
      return rejectWithValue(message);
    }
  }
);

// === Slice ===
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Сброс ошибки
    resetError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isAuthChecked = true;
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isAuthChecked = true;
      })
      // Get User
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(getUser.rejected, (state) => {
        state.user = null;
        state.isAuthChecked = true;
      })
      // Update User
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthChecked = true;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  }
});

export const { resetError } = authSlice.actions;
export default authSlice.reducer;
