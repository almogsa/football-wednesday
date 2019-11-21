import { createSelector } from '@ngrx/store';

// import { selectRouterState } from '../../../core/core.module';


import { playersAdapter } from '../reducers/players.reducer';
import {FeaturesState, selectFeatures} from '../../features.state';

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
  selectEntities,
  (entities, params) => entities.filter(player => player.arrived)
);
// export const selectSelectedPlayer = createSelector(
//   selectPlayersEntities,
//   (entities, params) => params && entities[params.state.params.id]
// );
