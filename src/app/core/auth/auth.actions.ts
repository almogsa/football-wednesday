import {createAction, props} from '@ngrx/store';
import {User} from './auth.models';

export const authLogin = createAction('[Auth] Login', props<{ user: User }>());
export const authLogout = createAction('[Auth] Logout');
export const authSuccess = createAction('[Auth] Login Success');
export const authFailed = createAction('[Auth] Login Failed', props<{ error: string }>());
export const authLogoutFailed = createAction('[Auth] Logout Failed', props<{ error: string }>());
export const authLogoutSuccess = createAction('[Auth] Logout Success');
