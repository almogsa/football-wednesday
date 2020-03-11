import {createSelector, State} from '@ngrx/store';

// import { selectRouterState } from '../../../core/core.module';


import {playersAdapter} from '../reducers/players.reducer';
import {FeaturesState, selectFeatures} from '../../features.state';
import {PlayersState} from '../models';
import {AppState} from '../../../core/core.state';

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = playersAdapter.getSelectors();


export const selectPlayersState = createSelector(
  selectFeatures,
  (state: FeaturesState) => state.players
);

export const selectAllPlayers = createSelector(
  selectPlayersState,
  selectAll
);
export const selectPlayersEntities = createSelector(
  selectPlayersState,
  selectEntities
);
export const selectPlayersTotal = createSelector(
  selectPlayersState,
  selectTotal
);
export const selectPlayersArrived = createSelector(
  selectAllPlayers,
  (entities) => entities.filter(player => player.arrive === true)
);

export const selectCaderPlayers = createSelector(
  selectAllPlayers,
  (entities) => entities.filter(player => player.arrive === false)
);

export const isLoading = createSelector(
  selectPlayersState,
  (state) => state.loading)



// export const selectSelectedPlayer = createSelector(
//   selectPlayersEntities,
//   (entities, params) => params && entities[params.state.params.id]
// );

