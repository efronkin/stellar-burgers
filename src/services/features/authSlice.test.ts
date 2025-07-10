import {
  authReducer,
  setAuthChecked,
  loginUser,
  registerUser,
  fetchUser,
  updateUser,
  logoutUser
} from './authSlice';
import { TUser } from '../../utils/types';

describe('authSlice', () => {
  const user: TUser = {
    email: 'test@example.com',
    name: 'Test User'
  };

  const initialState = {
    user: null,
    isLoading: false,
    error: null,
    isAuthChecked: false
  };

  it('проверка экшена setAuthChecked', () => {
    const state = authReducer(initialState, setAuthChecked(true));
    expect(state.isAuthChecked).toBe(true);
  });

  describe('loginUser', () => {
    it('loginUser.pending', () => {
      const state = authReducer(
        initialState,
        loginUser.pending('', { email: '', password: '' })
      );
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('loginUser.fulfilled', () => {
      const payload = {
        success: true,
        refreshToken: 'refresh-token',
        accessToken: 'access-token',
        user
      };
      const state = authReducer(
        initialState,
        loginUser.fulfilled(payload, '', { email: '', password: '' })
      );
      expect(state.user).toEqual(user);
      expect(state.isLoading).toBe(false);
      expect(state.isAuthChecked).toBe(true);
    });

    it('loginUser.rejected', () => {
      const state = authReducer(
        initialState,
        loginUser.rejected(null, '', { email: '', password: '' }, 'Test error')
      );
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Test error');
    });
  });

  describe('registerUser', () => {
    it('registerUser.pending', () => {
      const state = authReducer(
        initialState,
        registerUser.pending('', { email: '', password: '', name: '' })
      );
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('registerUser.fulfilled', () => {
      const payload = {
        success: true,
        refreshToken: 'refresh-token',
        accessToken: 'access-token',
        user
      };
      const state = authReducer(
        initialState,
        registerUser.fulfilled(payload, '', {
          email: '',
          password: '',
          name: ''
        })
      );
      expect(state.user).toEqual(user);
      expect(state.isLoading).toBe(false);
      expect(state.isAuthChecked).toBe(true);
    });

    it('registerUser.rejected', () => {
      const state = authReducer(
        initialState,
        registerUser.rejected(
          null,
          '',
          { email: '', password: '', name: '' },
          'Register failed'
        )
      );
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Register failed');
    });
  });

  describe('fetchUser', () => {
    it('fetchUser.fulfilled', () => {
      const state = authReducer(
        initialState,
        fetchUser.fulfilled(user, '', undefined)
      );
      expect(state.user).toEqual(user);
      expect(state.isAuthChecked).toBe(true);
    });

    it('fetchUser.rejected', () => {
      const prevState = { ...initialState, user };
      const state = authReducer(
        prevState,
        fetchUser.rejected(null, '', undefined)
      );
      expect(state.user).toBeNull();
      expect(state.isAuthChecked).toBe(true);
    });
  });

  describe('updateUser', () => {
    it('updateUser.pending', () => {
      const state = authReducer(initialState, updateUser.pending('', {}));
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('updateUser.fulfilled', () => {
      const state = authReducer(
        initialState,
        updateUser.fulfilled(user, '', {})
      );
      expect(state.user).toEqual(user);
      expect(state.isLoading).toBe(false);
    });

    it('updateUser.rejected', () => {
      const state = authReducer(
        initialState,
        updateUser.rejected(null, '', {}, 'Update failed')
      );
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Update failed');
    });
  });

  describe('logoutUser', () => {
    it('logoutUser.pending', () => {
      const state = authReducer(
        initialState,
        logoutUser.pending('', undefined)
      );
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('logoutUser.fulfilled', () => {
      const prevState = { ...initialState, user, isLoading: true };
      const state = authReducer(
        prevState,
        logoutUser.fulfilled(undefined, '', undefined)
      );
      expect(state.isLoading).toBe(false);
      expect(state.user).toBeNull();
      expect(state.isAuthChecked).toBe(true);
    });

    it('logoutUser.rejected', () => {
      const state = authReducer(
        initialState,
        logoutUser.rejected(null, '', undefined, 'Logout failed')
      );
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Logout failed');
    });
  });
});
