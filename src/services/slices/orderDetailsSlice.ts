// src/services/slices/orderDetailsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';

type TOrderDetailsState = {
  order: TOrder | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: TOrderDetailsState = {
  order: null,
  isLoading: false,
  error: null
};

export const fetchOrderByNumber = createAsyncThunk(
  'orderDetails/fetchOrderByNumber',
  async (number: number, { rejectWithValue }) => {
    try {
      const response = await getOrderByNumberApi(number);
      return response.orders[0]; // API возвращает массив с одним заказом
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Ошибка загрузки заказа';
      return rejectWithValue(message);
    }
  }
);

const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {
    clearOrderDetails: (state) => {
      state.order = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export const { clearOrderDetails } = orderDetailsSlice.actions;
export default orderDetailsSlice.reducer;
