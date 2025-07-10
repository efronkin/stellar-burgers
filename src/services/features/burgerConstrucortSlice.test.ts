import {
  burgerConstructorReducer,
  addIngredient,
  setBun,
  removeIngredient,
  moveIngredient
} from './burgerConstructorSlice';
import { TIngredient, TConstructorIngredient } from '../../utils/types';

describe('тесты burgerConstructorSlice', () => {
  const bun: TIngredient = {
    _id: 'bun',
    name: 'Test Bun',
    type: 'bun',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: '',
    image_mobile: '',
    image_large: ''
  };

  const ingredientMain: TConstructorIngredient = {
    _id: 'ing-main',
    id: 'uuid-1',
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

  const ingredientSauce: TConstructorIngredient = {
    _id: 'ing-sauce',
    id: 'uuid-2',
    name: 'Ingredient sauce',
    type: 'sauce',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: '',
    image_mobile: '',
    image_large: ''
  };

  it('добавление булки', () => {
    const state = burgerConstructorReducer(undefined, setBun(bun));
    expect(state.bun).toEqual(bun);
  });

  it('добавление ингредиента', () => {
    const state = burgerConstructorReducer(
      undefined,
      addIngredient(ingredientMain)
    );
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toEqual(ingredientMain);
  });

  it('удаление ингреиента', () => {
    const initialState = {
      bun: null,
      ingredients: [ingredientMain, ingredientSauce],
      orderRequest: false,
      orderModalData: null,
      error: null,
      isLoading: false
    };
    const state = burgerConstructorReducer(
      initialState,
      removeIngredient(ingredientMain.id)
    );
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toEqual(ingredientSauce);
  });

  it('изменение порядка ингредиентов', () => {
    const initialState = {
      bun: null,
      ingredients: [ingredientMain, ingredientSauce],
      orderRequest: false,
      orderModalData: null,
      error: null,
      isLoading: false
    };

    const state = burgerConstructorReducer(
      initialState,
      moveIngredient({ fromIndex: 0, toIndex: 1 })
    );

    expect(state.ingredients[0]).toEqual(ingredientSauce);
    expect(state.ingredients[1]).toEqual(ingredientMain);
  });
});
