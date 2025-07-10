import { rootReducer } from './store';

describe('проверка инициализации rootReducer', () => {
  it('возвращение начального состояния слайсов', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('burgerConstructor');
    expect(state).toHaveProperty('ingredientDetails');
    expect(state).toHaveProperty('auth');
    expect(state).toHaveProperty('feed');
    expect(state).toHaveProperty('orders');
    expect(state).toHaveProperty('orderDetails');
  });
});
