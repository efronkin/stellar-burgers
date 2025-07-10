import { feedReducer, fetchFeed } from './feedsSlice';
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
    orders: [],
    total: 0,
    totalToday: 0
  };

  it('вызов fetchFeed.pending', () => {
    const state = feedReducer(undefined, fetchFeed.pending('', undefined));
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('вызов fetchFeed.fulfilled', () => {
    const payload = {
      success: true,
      orders: [order],
      total: 10,
      totalToday: 5
    };

    const state = feedReducer(
      initialState,
      fetchFeed.fulfilled(payload, '', undefined)
    );

    expect(state.orders).toEqual([order]);
    expect(state.total).toBe(10);
    expect(state.totalToday).toBe(5);
    expect(state.isLoading).toBe(false);
  });

  it('вызов fetchFeed.rejected', () => {
    const errorMessage = 'Test error';
    const state = feedReducer(
      initialState,
      fetchFeed.rejected(null, '', undefined, errorMessage)
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});
