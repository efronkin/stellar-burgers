import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '../../utils/types';
import { RootState } from '../store';
import { orderBurgerApi } from '../../utils/burger-api';
import { createSelector } from '@reduxjs/toolkit';

type ConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null;
  isLoading: boolean;
};

const initialState: ConstructorState = {
  bun: null,
  ingredients: [],
  orderRequest: false,
  orderModalData: null,
  error: null,
  isLoading: false
};

export const sendOrderThunk = createAsyncThunk(
  'constructor/sendOrder',
  async (data: string[], thunkAPI) => {
    try {
      return await orderBurgerApi(data);
    } catch (err: unknown) {
      let errorMessage =
        'Произошла ошибка. Перезагрузите страницу или попробуйте позже';

      if (err instanceof Error) {
        errorMessage = err.message;
      }

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    setBun(state, action: PayloadAction<TIngredient>) {
      state.bun = action.payload;
    },
    addIngredient(state, action: PayloadAction<TConstructorIngredient>) {
      state.ingredients.push(action.payload);
    },
    removeIngredient(state, action: PayloadAction<string>) {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    moveIngredient(
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) {
      const { fromIndex, toIndex } = action.payload;
      const [moved] = state.ingredients.splice(fromIndex, 1);
      state.ingredients.splice(toIndex, 0, moved);
    },
    clearConstructor(state) {
      state.bun = null;
      state.ingredients = [];
    },
    setOrderModalData(state, action: PayloadAction<TOrder | null>) {
      state.orderModalData = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrderThunk.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
        state.isLoading = true;
      })
      .addCase(sendOrderThunk.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
        state.isLoading = false;
      })
      .addCase(sendOrderThunk.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.payload as string;
        state.isLoading = false;
      });
  }
});

export const {
  setBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
  setOrderModalData
} = burgerConstructorSlice.actions;

export const selectConstructorItems = createSelector(
  (state: RootState) => state.burgerConstructor.bun,
  (state: RootState) => state.burgerConstructor.ingredients,
  (bun, ingredients) => ({
    bun,
    ingredients
  })
);

export const selectOrderRequest = (state: RootState) =>
  state.burgerConstructor.orderRequest;

export const selectOrderModalData = (state: RootState) =>
  state.burgerConstructor.orderModalData;

export const burgerConstructorReducer = burgerConstructorSlice.reducer;
