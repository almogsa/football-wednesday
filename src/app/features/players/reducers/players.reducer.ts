import { v4 as uuid } from 'uuid';
import { createReducer, on, Action } from '@ngrx/store';
import * as playerAction from '../actions/players.actions';
import { Player, PlayersState } from '../models/players.model';

export const initialState: PlayersState = {
  items: [
    { id: uuid(), name: 'Open Todo list example', done: true },
    { id: uuid(), name: 'Check the other examples', done: false },
    {
      id: uuid(),
      name: 'Use Angular ngRx Material Starter in your project',
      done: false
    }
  ],
  filter: 'ALL'
};

const reducer = createReducer(
  initialState,
  on(playerAction.actionTodosAdd, (state, todo) => ({
    ...state,
    items: [
      {
        id: todo.id,
        name: todo.name,
        done: false
      },
      ...state.items
    ]
  })),
  on(playerAction.actionTodosToggle, (state, todo) => ({
    ...state,
    items: state.items.map((item: Player) =>
      item.id === todo.id ? { ...item, done: !item.done } : item
    )
  })),
  on(playerAction.actionTodosRemoveDone, (state, todo) => ({
    ...state,
    items: state.items.filter((item: Player) => !item.done)
  })),
  on(playerAction.actionTodosFilter, (state, todo) => ({
    ...state,
    filter: todo.filter
  }))
);

export function playersReducer(state:PlayersState | undefined, action: Action) {
  return reducer(state, action);
}
