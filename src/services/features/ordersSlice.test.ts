import { orderReducer, fetchOrders } from './ordersSlice';
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

  const initialState = {
    isLoading: false,
    error: null,
    orders: []
  };

  it('вызов fetchOrders.pending', () => {
    const state = orderReducer(undefined, fetchOrders.pending('', undefined));
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('вызов fetchOrders.fulfilled', () => {
    const state = orderReducer(
      initialState,
      fetchOrders.fulfilled([order], '', undefined)
    );

    expect(state.orders).toEqual([order]);
    expect(state.isLoading).toBe(false);
  });

  it('вызов fetchOrders.rejected', () => {
    const errorMessage = 'Test error';
    const state = orderReducer(
      initialState,
      fetchOrders.rejected(null, '', undefined, errorMessage)
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});
