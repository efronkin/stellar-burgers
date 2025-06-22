import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';
import { RootState } from '../../services/store';

type FeedState = {
  isLoading: boolean;
  error: string | null;
  orders: TOrder[];
  total: number;
  totalToday: number;
};

const initialState: FeedState = {
  isLoading: false,
  error: null,
  orders: [],
  total: 0,
  totalToday: 0
};

export const fetchFeed = createAsyncThunk(
  'feed/fetchFeed',
  async (_, { rejectWithValue }) => {
    try {
      return await getFeedsApi();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue(
        'Ошибка при загрузке. Пожалуйста, обновите страницу или попробуйте позже'
      );
    }
  }
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.isLoading = false;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export const feedReducer = feedSlice.reducer;

export const selectFeeds = (state: RootState) => state.feed;
export const selectFeedOrders = (state: RootState) => state.feed.orders;
export const selectFeedsLoading = (state: RootState) => state.feed.isLoading;
export const selectFeedsError = (state: RootState) => state.feed.error;
