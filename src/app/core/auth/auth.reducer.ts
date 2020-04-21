import { AuthState } from './auth.models';
import {authLogin, authLogout, authFailed, authSuccess, authLogoutSuccess} from './auth.actions';
import { createReducer, on, Action } from '@ngrx/store';

export const initialState: AuthState = {
  isAuthenticated: false
};

const reducer = createReducer(
  initialState,
  on(authLogin, state => ({ ...state})),
  on(authSuccess, state => ({ ...state, isAuthenticated: true })),
  on(authFailed, state => ({ ...state, isAuthenticated: false })),
  on(authLogoutSuccess, state => ({ ...state, isAuthenticated: false })),
);

export function authReducer(
  state: AuthState | undefined,
  action: Action
): AuthState {
  return reducer(state, action);
}
