import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';
import { RootState } from '../store';

interface OrderDetailsState {
  order: TOrder | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: OrderDetailsState = {
  order: null,
  isLoading: false,
  error: null
};

export const fetchOrderByNumber = createAsyncThunk<
  TOrder,
  number,
  { rejectValue: string }
>('orderDetails/fetchOrderByNumber', async (number, { rejectWithValue }) => {
  try {
    const response = await getOrderByNumberApi(number);
    return response.orders[0];
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue('Не удалось загрузить заказ. Попробуйте позже.');
  }
});

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
        state.error = action.payload ?? 'Неизвестная ошибка';
      });
  }
});

export const { clearOrderDetails } = orderDetailsSlice.actions;

export const selectOrderDetails = (state: RootState) =>
  state.orderDetails.order;
export const selectOrderDetailsLoading = (state: RootState) =>
  state.orderDetails.isLoading;
export const selectOrderDetailsError = (state: RootState) =>
  state.orderDetails.error;

export const orderDetailsReducer = orderDetailsSlice.reducer;
