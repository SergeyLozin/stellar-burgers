import authReducer, {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  logoutUser,
  resetError
} from './authSlice';

describe('authSlice', () => {
  const initialState = {
    isAuthChecked: false,
    user: null,
    error: null
  };

  describe('редьюсеры', () => {
    it('должен возвращать начальное состояние', () => {
      expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('должен сбрасывать ошибку', () => {
      const stateWithError = {
        ...initialState,
        error: 'Какая-то ошибка'
      };
      const newState = authReducer(stateWithError, resetError());
      expect(newState.error).toBeNull();
    });
  });

  describe('асинхронные экшены', () => {
    describe('registerUser', () => {
      it('должен обрабатывать pending состояние', () => {
        const action = { type: registerUser.pending.type };
        const state = authReducer(initialState, action);
        expect(state.error).toBeNull();
      });

      it('должен обрабатывать rejected состояние', () => {
        const errorMessage = 'Ошибка регистрации';
        const action = {
          type: registerUser.rejected.type,
          payload: errorMessage
        };
        const state = authReducer(initialState, action);
        expect(state.error).toBe(errorMessage);
        expect(state.isAuthChecked).toBe(true);
      });
    });

    describe('loginUser', () => {
      it('должен обрабатывать pending состояние', () => {
        const action = { type: loginUser.pending.type };
        const state = authReducer(initialState, action);
        expect(state.error).toBeNull();
      });

      it('должен обрабатывать rejected состояние', () => {
        const errorMessage = 'Ошибка входа';
        const action = {
          type: loginUser.rejected.type,
          payload: errorMessage
        };
        const state = authReducer(initialState, action);
        expect(state.error).toBe(errorMessage);
        expect(state.isAuthChecked).toBe(true);
      });
    });

    describe('getUser', () => {
      it('должен обрабатывать rejected состояние (нет токена)', () => {
        const action = {
          type: getUser.rejected.type,
          payload: 'No token'
        };
        const state = authReducer(initialState, action);
        expect(state.user).toBeNull();
        expect(state.isAuthChecked).toBe(true);
      });
    });

    describe('updateUser', () => {
      it('должен обрабатывать rejected состояние', () => {
        const errorMessage = 'Ошибка обновления';
        const action = {
          type: updateUser.rejected.type,
          payload: errorMessage
        };
        const state = authReducer(initialState, action);
        expect(state.error).toBe(errorMessage);
      });
    });

    describe('logoutUser', () => {
      it('должен обрабатывать fulfilled состояние', () => {
        const action = { type: logoutUser.fulfilled.type };
        const state = authReducer(initialState, action);
        expect(state.user).toBeNull();
        expect(state.isAuthChecked).toBe(true);
      });
    });
  });
});