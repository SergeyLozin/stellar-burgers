// src/services/slices/feedSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { TOrdersData } from '@utils-types';

type TFeedState = {
  orders: TOrdersData['orders'];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | null;
};

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null,
};

export const fetchFeeds = createAsyncThunk(
  'feed/fetchFeeds',
  async (_, { rejectWithValue }) => {
    console.log('🚀 fetchFeeds: начинаем запрос...');
    try {
      const response = await getFeedsApi();
      console.log('✅ API ответ:', { 
        success: response.success, 
        ordersCount: response.orders?.length,
        total: response.total 
      });
      return response;
    } catch (error: any) {
      console.error('❌ Ошибка в fetchFeeds:', error);
      return rejectWithValue(error.message || 'Ошибка загрузки');
    }
  }
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        console.log('⏳ fetchFeeds.pending');
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        console.log('✅ fetchFeeds.fulfilled:', {
          orders: action.payload.orders.length,
          total: action.payload.total
        });
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        console.log('❌ fetchFeeds.rejected:', action.payload);
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default feedSlice.reducer;