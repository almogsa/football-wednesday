import { v4 as uuid } from 'uuid';
import { createAction, props } from '@ngrx/store';

import {Player, PlayersFilter} from 'features/players/models';
import {EntityMap, Update} from '@ngrx/entity';
import {Predicate} from '@angular/core';


export const actionPlayersFilter = createAction(
   '[Players] Filter',
   props<{ filter: PlayersFilter }>()
 );

export const loadPlayers = createAction('[Players/API] Load Players', props<{ players: Player[] }>());
export const load = createAction('[Players/API] Load');
export const loadPlayersSuccess = createAction('[Players/API] Load Players Success', props<{ players: Player[] }>());
export const loadPlayersFailed = createAction('[Players/API] Load Players Failed', props<{ error: string }>());
export const addPlayer = createAction('[Players/API] Add Player', props<{ player: Player }>());
export const upsertPlayer = createAction('[Players/API] Upsert Player', props<{ player: Player }>());
export const addPlayers = createAction('[Players/API] Add Players', props<{ players: Player[] }>());
export const upsertPlayers = createAction('[Players/API] Upsert Players', props<{ players: Player[] }>());
export const updatePlayer = createAction('[Players/API] Update Player', props<{ player: Update<Player> }>());
export const updatePlayers = createAction('[Players/API] Update Players', props<{ players: Update<Player>[] }>());
export const mapPlayers = createAction('[Players/API] Map Players', props<{ entityMap: EntityMap<Player> }>());
export const deletePlayer = createAction('[Players/API] Delete Player', props<{ id: string }>());
export const deletePlayers = createAction('[Players/API] Delete Players', props<{ ids: string[] }>());
export const deletePlayersByPredicate = createAction('[Player/API] Delete Players By Predicate', props<{ predicate: Predicate<Player> }>());
export const clearPlayers = createAction('[Players/API] Clear Players');
export const resetPlayers = createAction('[Players/API] Reset Players');
export const successOperation = createAction('[Players/API] Success Operation Players');
export const operationFailed = createAction('[Players/API] Operation Failed', props<{ error: string }>());
