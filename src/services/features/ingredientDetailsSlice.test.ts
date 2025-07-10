import {
  ingredientDetailsReducer,
  clearIngredientDetails,
  setIngredientDetails
} from './ingredientDetailsSlice';
import { TIngredient } from '../../utils/types';

describe('тесты burgerConstructorSlice', () => {
  const ingredient: TIngredient = {
    _id: 'ing-main',
    name: 'Ingredient main',
    type: 'main',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: '',
    image_mobile: '',
    image_large: ''
  };

  it('выполнение ingredientDetailsReducer', () => {
    const initialState = {
      ingredient: ingredient,
      isLoading: false,
      error: null
    };

    const state = ingredientDetailsReducer(
      initialState,
      clearIngredientDetails()
    );
    expect(state.ingredient).toEqual(null);
    expect(state.isLoading).toEqual(false);
    expect(state.error).toEqual(null);
  });

  it('выполнение ingredientDetailsReducer', () => {
    const initialState = {
      ingredient: null,
      isLoading: false,
      error: null
    };

    const state = ingredientDetailsReducer(
      initialState,
      setIngredientDetails(ingredient)
    );
    expect(state.ingredient).toEqual(ingredient);
    expect(state.isLoading).toEqual(false);
    expect(state.error).toEqual(null);
  });
});
