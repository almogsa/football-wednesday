import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import {AppState} from '../core/core.state';
import {PlayersState} from './players/models/players.model';



 import { playersReducer } from './players/reducers/players.reducer';
// import { TodosState } from './todos/todos.model';
// import { stockMarketReducer } from './stock-market/stock-market.reducer';
// import { StockMarketState } from './stock-market/stock-market.model';
// import { bookReducer } from './crud/books.reducer';
// import { formReducer } from './form/form.reducer';
// import { FormState } from './form/form.model';
// import { BookState } from './crud/books.model';

export const FEATURE_NAME = 'features';
export const selectFeatures = createFeatureSelector<State, FeaturesState>(
  FEATURE_NAME
);
export const reducers: ActionReducerMap<FeaturesState> = {
  players: playersReducer,

};

export interface FeaturesState {
  players: PlayersState;

}

export interface State extends AppState {
  features: FeaturesState;
}
