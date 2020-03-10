import {State, Store} from '@ngrx/store';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {PlayersActions} from '../actions';
import {PlayersService} from '../services/players.service';
import {Injectable} from '@angular/core';
import {Actions, Effect, ofType, createEffect} from '@ngrx/effects';
import {AppState} from '../../../core/core.state';

import {interval, of} from 'rxjs';
import {Player} from '../models';

@Injectable()
export class PlayersEffects {
  constructor(private actions$: Actions,
              private store: Store<AppState>, private playersService: PlayersService) {
  }

  getPlayers$ = createEffect(() => this.actions$.pipe(
    ofType(PlayersActions.load),
    switchMap(() => {
      return this.playersService.getPlayers().pipe(
        map((data) => {
          console.log('Result', data);
          const players = data.map(e => {
            return {
              ...e.payload.doc.data(),
              id: e.payload.doc.id,
            } as Player;
          });
          console.log('Players: ', players);
          return PlayersActions.loadPlayersSuccess({players});
        }),
        catchError((error: Error) => of(PlayersActions.loadPlayersFailed({error: error.message}))));
    }))
  );
  updatePlayer$ = createEffect(() => this.actions$.pipe(
    ofType(PlayersActions.upsertPlayer),
    switchMap((action) => {
      return of(this.playersService.updatePlayer(action.player)).pipe(
        map((data) => {
          console.log('Result', data);
          // return PlayersActions.updatePlayer({player: action.player});
        }),
        catchError((error: Error) => of(PlayersActions.loadPlayersFailed({error: error.message}))));
    })), {dispatch: false}
  );
  resetPlayer$ = createEffect(() => this.actions$.pipe(
    ofType(PlayersActions.resetPlayers),
    switchMap((action) => {
      return of(this.playersService.resetPlayers()).pipe(
        map((data) => {
          console.log('Result', data);
          // return PlayersActions.updatePlayer({player: action.player});
        }),
        catchError((error: Error) => of(PlayersActions.loadPlayersFailed({error: error.message}))));
    })), {dispatch: false}
  );
  deletePlayer$ = createEffect(() => this.actions$.pipe(
    ofType(PlayersActions.deletePlayer),
    switchMap((action) => {
      return of(this.playersService.deletePlayer(action.id)).pipe(
        map((data) => {
          console.log('Result', data);
          // return PlayersActions.updatePlayer({player: action.player});
        }),
        catchError((error: Error) => of(PlayersActions.loadPlayersFailed({error: error.message}))));
    })), {dispatch: false}
  );
  addPlayer$ = createEffect(() => this.actions$.pipe(
    ofType(PlayersActions.addPlayer),
    switchMap((action) => {
      return of(this.playersService.addPlayer(action.player)).pipe(
        map((data) => {
          console.log('Result', data);
         // return PlayersActions.addPlayer({player: action.player});
        }),
        catchError((error: Error) => of(PlayersActions.loadPlayersFailed({error: error.message}))));
    })), {dispatch: false}
  );
}
