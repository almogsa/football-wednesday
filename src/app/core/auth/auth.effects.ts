import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ofType, createEffect, Actions} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';

import {LocalStorageService} from '../local-storage/local-storage.service';

import { authLogin, authLogout, authSuccess, authFailed, authLogoutSuccess, authLogoutFailed } from './auth.actions';
import {FirebaseAuthService} from './firebase-auth.service';
import {of} from 'rxjs';

export const AUTH_KEY = 'AUTH';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private localStorageService: LocalStorageService,
    private firebaseAuthService: FirebaseAuthService,
    private router: Router
  ) {}

  login = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authLogin),
        switchMap((action) => {
            // return this.firebaseAuthService.auth().pipe(
            return this.firebaseAuthService.signInWithEmailAndPassword(action.user.name, action.user.password).pipe(
              map(data => {
                return authSuccess();
                this.localStorageService.setItem(AUTH_KEY, {isAuthenticated: true});
              }),
              catchError(error => of(authFailed(error)))
            );
        })
      ));

  logout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authLogout),
        switchMap((action) => {
          return this.firebaseAuthService.SignOut().pipe(
            map(data => {
              console.log('user log out');
              return authLogoutSuccess();
            }),
            catchError(error => of(authLogoutFailed(error)))
          );
        })
      ));
}
