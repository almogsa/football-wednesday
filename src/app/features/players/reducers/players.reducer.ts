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
  ids: ['101', '102', '103', '104', '105', '106'],
  entities: {
    ['101']: {
      id: '101',
      name: 'Oren Farhi',
      s_name: 'Zizo',
      arrive: true,
      image: '',
      number: 8,
      phone: '0525597072',
      strength: 60,
      admin: true,
      birth: '3/4/1976',
      avatar: '../../../../../assets/almog.png'
    },
    ['102']: {
      id: '102',
      name: 'Beni Abargil',
      s_name: 'Zizo',
      arrive: true,
      image: '',
      number: 8,
      phone: '0525597072',
      strength: 60,
      admin: true,
      birth: '3/4/1976',
      avatar: '../../../../../assets/firmino.png'
    },
    ['103']: {
      id: '103',
      name: 'Oren Farhi',
      s_name: 'Zizo',
      arrive: true,
      image: '',
      number: 8,
      phone: '0525597072',
      strength: 60,
      admin: true,
      birth: '3/4/1976',
      avatar: '../../../../../assets/chris.png'
    },
    ['104']: {
      id: '104',
      name: 'Alon Cohen',
      s_name: 'Zizo',
      arrive: true,
      image: '',
      number: 8,
      phone: '0525597072',
      strength: 60,
      admin: true,
      birth: '3/4/1976',
      avatar: '../../../../../assets/empty_profile.png'
    },
    ['105']: {
      id: '105',
      name: 'ZiZI fdf Farhi',
      s_name: 'Zizo',
      arrive: true,
      image: '',
      number: 8,
      phone: '0525597072',
      strength: 60,
      admin: true,
      birth: '3/4/1976',
      avatar: '../../../../../assets/almog.png'
    },
    ['106']: {
      id: '106',
      name: 'Almog Sade',
      s_name: 'Zizo',
      arrive: true,
      image: '',
      number: 8,
      phone: '0525597072',
      strength: 60,
      admin: true,
      birth: '3/4/1976',
      avatar: '../../../../../assets/empty_profile.png'
    }
  }
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
  on(PlayersActions.clearPlayers, state => {
    return playersAdapter.removeAll({ ...state, selectedplayerId: null });
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
