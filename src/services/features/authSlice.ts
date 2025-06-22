import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  loginUserApi,
  registerUserApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  TAuthResponse,
  TLoginData,
  forgotPasswordApi,
  TRegisterData
} from '../../utils/burger-api';
import { TUser } from '../../utils/types';
import { RootState } from '../store';

export type AuthState = {
  user: TUser | null;
  isLoading: boolean;
  error: string | null;
  isAuthChecked: boolean;
};

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthChecked: false
};

export const loginUser = createAsyncThunk<TAuthResponse, TLoginData>(
  'auth/loginUser',
  async (data, { rejectWithValue }) => {
    try {
      return await loginUserApi(data);
    } catch (err: unknown) {
      let errorMessage =
        'Произошла ошибка. Перезагрузите страницу или попробуйте позже';

      if (err instanceof Error) {
        errorMessage = err.message;
      }

      return rejectWithValue(errorMessage);
    }
  }
);

export const registerUser = createAsyncThunk<TAuthResponse, TRegisterData>(
  'auth/registerUser',
  async (data, { rejectWithValue }) => {
    try {
      return await registerUserApi(data);
    } catch (err: unknown) {
      let errorMessage =
        'Произошла ошибка. Перезагрузите страницу или попробуйте позже';

      if (err instanceof Error) {
        errorMessage = err.message;
      }

      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchUser = createAsyncThunk<TUser, void>(
  'auth/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const res = await getUserApi();
      return res.user;
    } catch (err: unknown) {
      let errorMessage =
        'Произошла ошибка. Перезагрузите страницу или попробуйте позже';

      if (err instanceof Error) {
        errorMessage = err.message;
      }

      return rejectWithValue(errorMessage);
    }
  }
);

export const updateUser = createAsyncThunk<TUser, Partial<TRegisterData>>(
  'auth/updateUser',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await updateUserApi(userData);
      return res.user;
    } catch (err: unknown) {
      let errorMessage =
        'Произошла ошибка. Перезагрузите страницу или попробуйте позже';

      if (err instanceof Error) {
        errorMessage = err.message;
      }

      return rejectWithValue(errorMessage);
    }
  }
);

export const logoutUser = createAsyncThunk<void, void>(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      localStorage.removeItem('refreshToken');
      document.cookie = 'accessToken=; Max-Age=0';
    } catch (err: unknown) {
      let errorMessage =
        'Произошла ошибка. Перезагрузите страницу или попробуйте позже';

      if (err instanceof Error) {
        errorMessage = err.message;
      }

      return rejectWithValue(errorMessage);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (data: { email: string }, { rejectWithValue }) => {
    try {
      return await forgotPasswordApi(data);
    } catch (err: unknown) {
      let errorMessage =
        'Произошла ошибка. Перезагрузите страницу или попробуйте позже';

      if (err instanceof Error) {
        errorMessage = err.message;
      }

      return rejectWithValue(errorMessage);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthChecked(state, action: PayloadAction<boolean>) {
      state.isAuthChecked = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      })

      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      })

      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.user = null;
        state.isAuthChecked = true;
      })

      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      })

      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthChecked = true;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      });
  }
});

export const { setAuthChecked } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthChecked = (state: RootState) =>
  state.auth.isAuthChecked;
export const selectAuthLoading = (state: RootState) => state.auth.isLoading;
export const selectAuthError = (state: RootState) => state.auth.error;

export const authReducer = authSlice.reducer;
