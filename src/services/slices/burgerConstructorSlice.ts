// src/services/slices/burgerConstructorSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TOrder } from '@utils-types';
import { orderBurgerApi } from '@api';

type TBurgerConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null;
};

const initialState: TBurgerConstructorState = {
  bun: null,
  ingredients: [],
  orderRequest: false,
  orderModalData: null,
  error: null
};

export const sendOrder = createAsyncThunk(
  'burgerConstructor/sendOrder',
  async (ingredientsIds: string[], { rejectWithValue }) => {
    try {
      const response = await orderBurgerApi(ingredientsIds);
      return response;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Ошибка оформления заказа';
      return rejectWithValue(message);
    }
  }
);

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients.push(action.payload);
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
    closeOrderModal: (state) => {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(sendOrder.fulfilled, (state, action) => {
        state.orderRequest = false;

        // Преобразуем ответ API в формат TOrder, который ожидает UI
        const apiOrder = action.payload.order;
        state.orderModalData = {
          _id: apiOrder._id,
          status: apiOrder.status,
          name: apiOrder.name,
          createdAt: apiOrder.createdAt,
          updatedAt: apiOrder.updatedAt,
          number: apiOrder.number,
          ingredients: [] // API не возвращает ingredients при создании, оставляем пустым
        } as TOrder;

        // Очищаем конструктор после успешного заказа
        state.bun = null;
        state.ingredients = [];
      })
      .addCase(sendOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.payload as string;
      });
  }
});

export const {
  addIngredient,
  removeIngredient,
  clearConstructor,
  closeOrderModal
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
