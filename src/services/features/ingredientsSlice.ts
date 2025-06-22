import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';
import { TIngredient } from '../../utils/types';
import { RootState } from '../store';

type IngredientsState = {
  items: TIngredient[];
  isLoading: boolean;
  selectedItem: TIngredient | null;
  bun: TIngredient[];
  main: TIngredient[];
  sauce: TIngredient[];
  error: string | null;
};

const initialState: IngredientsState = {
  items: [],
  isLoading: false,
  selectedItem: null,
  bun: [],
  main: [],
  sauce: [],
  error: null
};

export const fetchIngredients = createAsyncThunk<
  TIngredient[],
  void,
  { rejectValue: string }
>('ingredients/fetchIngredients', async (_, { rejectWithValue }) => {
  try {
    const data = await getIngredientsApi();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue(
      'Ошибка при загрузке. Пожалуйста, обновите страницу или попробуйте позже'
    );
  }
});

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Неизвестная ошибка';
      });
  }
});

export const selectIngredientsState = (state: RootState) => state.ingredients;
export const selectIngredientsList = (state: RootState) =>
  state.ingredients.items;

export const ingredientsReducer = ingredientsSlice.reducer;
