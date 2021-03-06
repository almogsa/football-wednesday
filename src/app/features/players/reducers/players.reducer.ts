import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';

import { Player, PlayersState } from '../models/players.model';
import { PlayersActions } from 'features/players/actions';
import { Action, createReducer, on } from '@ngrx/store';

export function sortByTitle(a: Player, b: Player): number {
  return a.name.localeCompare(b.name);
}

export const playersAdapter: EntityAdapter<Player> = createEntityAdapter<Player>({
  sortComparer: sortByTitle
});

export const initialState: PlayersState = playersAdapter.getInitialState({
  loading: false
});

const reducer = createReducer(
  initialState,
  on(PlayersActions.addPlayer, (state, { player }) => {
    return playersAdapter.addOne(player, state);
  }),
  on(PlayersActions.upsertPlayer, (state, { player }) => {
    return playersAdapter.upsertOne(player, state);
  }),
  on(PlayersActions.addPlayers, (state, { players }) => {
    return playersAdapter.addMany(players, state);
  }),
  on(PlayersActions.upsertPlayers, (state, { players }) => {
    return playersAdapter.upsertMany(players, state);
  }),
  on(PlayersActions.updatePlayer, (state, { player }) => {
    return playersAdapter.updateOne(player, state);
  }),
  on(PlayersActions.updatePlayers, (state, { players }) => {
    return playersAdapter.updateMany(players, state);
  }),
  on(PlayersActions.mapPlayers, (state, { entityMap }) => {
    return playersAdapter.map(entityMap, state);
  }),
  on(PlayersActions.deletePlayer, (state, { id }) => {
    return playersAdapter.removeOne(id, state);
  }),
  on(PlayersActions.deletePlayers, (state, { ids }) => {
    return playersAdapter.removeMany(ids, state);
  }),
  on(PlayersActions.deletePlayersByPredicate, (state, { predicate }) => {
    return playersAdapter.removeMany(predicate, state);
  }),
  on(PlayersActions.loadPlayers, (state, { players }) => {
    return playersAdapter.addAll(players, state);
  }),
  on(PlayersActions.loadPlayersSuccess, (state, { players }) => {
    return playersAdapter.addAll(players, state);
  }),
  on(PlayersActions.loadPlayersFailed, (state, { error }) => {
    console.log('Error :' ,  error);
    return state;
      // return playersAdapter.addAll(players, state);
  }),
  on(PlayersActions.operationFailed, (state, { error }) => {
    console.log('Error :' ,  error);
    return state;
    // return playersAdapter.addAll(players, state);
  }),
  on(PlayersActions.clearPlayers, state => {
    return playersAdapter.removeAll({ ...state, selectedplayerId: null });
  }),
  on(PlayersActions.successOperation, state => {
    return state;
  }),
  on(PlayersActions.resetPlayers, (state) => {
  const updates = [];
  state.ids.forEach(playerId => {
    updates.push({
      id: playerId,
      changes: {
        arrive: false
      }
    });
  });
  return playersAdapter.updateMany(updates, state);
  })
  // on(actionPlayersUpsertOne, (state, { player }) =>
  //   playersAdapter.upsertOne(player, state)
  // ),
  // on(actionPlayersDeleteOne, (state, { id }) => playersAdapter.removeOne(id, state))
);

export function playersReducer(state: PlayersState | undefined, action: Action) {
  return reducer(state, action);
}
