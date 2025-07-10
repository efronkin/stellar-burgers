import { ingredientsReducer, fetchIngredients } from './ingredientsSlice';
import { TIngredient } from '../../utils/types';

describe('тесты ingredientsSlice', () => {
  const ingredient: TIngredient = {
    _id: 'ing1',
    name: 'Test Ingredient',
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

  const initialState = {
    items: [],
    isLoading: true,
    selectedItem: null,
    bun: [],
    main: [],
    sauce: [],
    error: null
  };

  it('вызов fetchIngredients.pending', () => {
    const state = ingredientsReducer(
      undefined,
      fetchIngredients.pending('', undefined)
    );
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('вызов fetchIngredients.fulfilled', () => {
    const state = ingredientsReducer(
      initialState,
      fetchIngredients.fulfilled([ingredient], '', undefined)
    );

    expect(state.items).toEqual([ingredient]);
    expect(state.isLoading).toBe(false);
  });

  it('вызов fetchIngredients.rejected', () => {
    const errorMessage = 'Test error';
    const state = ingredientsReducer(
      initialState,
      fetchIngredients.rejected(null, '', undefined, errorMessage)
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});
