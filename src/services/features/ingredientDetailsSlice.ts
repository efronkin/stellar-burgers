import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '../../utils/types';
import { RootState } from '../store';

type ingredientDetailsState = {
  ingredient: TIngredient | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: ingredientDetailsState = {
  ingredient: null,
  isLoading: false,
  error: null
};

const ingredientDetailsSlice = createSlice({
  name: 'ingredientDetails',
  initialState,
  reducers: {
    clearIngredientDetails(state) {
      state.ingredient = null;
      state.isLoading = false;
      state.error = null;
    },
    setIngredientDetails(state, action: PayloadAction<TIngredient>) {
      state.ingredient = action.payload;
      state.isLoading = false;
      state.error = null;
    }
  }
});

export const { clearIngredientDetails, setIngredientDetails } =
  ingredientDetailsSlice.actions;

export const selectIngredientDetails = (state: RootState) =>
  state.ingredientDetails.ingredient;
export const selectIngredientDetailsLoading = (state: RootState) =>
  state.ingredientDetails.isLoading;
export const selectIngredientDetailsError = (state: RootState) =>
  state.ingredientDetails.error;

export const ingredientDetailsReducer = ingredientDetailsSlice.reducer;
