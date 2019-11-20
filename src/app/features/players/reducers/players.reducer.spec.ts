
import { playersReducer, initialState } from '../reducers/players.reducer';
import { Player, PlayersState } from '../models/players.model';
import { actionPlayersDeleteOne, actionPlayersUpsertOne } from '../actions/players.actions';


describe('BookReducer', () => {
  const TEST_INITIAL_STATE: PlayersState = {
    ids: ['123'],
    entities: {
      ['123']: {
        id: '123',
        title: 'Reactive Programming with Angular and ngrx',
        author: 'Oren Farhi',
        description:
          'Learn to Harness the Power of Reactive Programming with RxJS and ngrx Extensions'
      }
    }
  };

  it('should return the default state', () => {
    const action = {} as any;
    const state = playersReducer(undefined, action);

    expect(state).toBe(initialState);
  });

  it('should add a book', () => {
    const action = actionPlayersUpsertOne({
      player: {
        id: '1234',
        title: 'test',
        author: 'test',
        description: 'test'
      }
    });
    const state = playersReducer(TEST_INITIAL_STATE, action);

    expect(state.ids.length).toEqual(2);
    expect(state.entities['1234'].title).toEqual('test');
  });

  it('should update a book', () => {
    const id = TEST_INITIAL_STATE.ids[0] as string;
    const action = actionPlayersUpsertOne({
      player: {
        id,
        title: 'updated',
        author: 'updated',
        description: 'updated'
      }
    });

    const state = playersReducer(TEST_INITIAL_STATE, action);
    expect(state.entities[id]).toEqual(
      jasmine.objectContaining({
        title: 'updated',
        author: 'updated',
        description: 'updated'
      })
    );
  });

  it('should remove a book', () => {
    const id = TEST_INITIAL_STATE.ids[0] as string;
    const action = actionPlayersDeleteOne({ id });
    const state = playersReducer(TEST_INITIAL_STATE, action);
    expect(state.entities[id]).toBe(undefined);
  });
});
