import { orderDetailsReducer, fetchOrderByNumber } from './orderDetailsSlice';
import { TOrder } from '../../utils/types';

describe('тесты ingredientsSlice', () => {
  const order: TOrder = {
    _id: 'order1',
    number: 12345,
    name: 'Test Order',
    status: 'done',
    ingredients: ['ing1', 'ing2'],
    createdAt: '',
    updatedAt: ''
  };

  it('вызов fetchOrderByNumber.pending', () => {
    const state = orderDetailsReducer(
      undefined,
      fetchOrderByNumber.pending('', order.number)
    );
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('вызов fetchOrderByNumber.fulfilled', () => {
    const initialState = {
      order: null,
      isLoading: false,
      error: null
    };

    const state = orderDetailsReducer(
      initialState,
      fetchOrderByNumber.fulfilled(order, '', order.number)
    );

    expect(state.order).toEqual(order);
    expect(state.isLoading).toBe(false);
  });

  it('вызов fetchOrderByNumber.rejected', () => {
    const initialState = {
      order: null,
      isLoading: false,
      error: null
    };

    const errorMessage = 'Test error';
    const state = orderDetailsReducer(
      initialState,
      fetchOrderByNumber.rejected(null, '', order.number, errorMessage)
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});
