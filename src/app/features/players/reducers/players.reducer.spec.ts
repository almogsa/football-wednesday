
import { playersReducer, initialState } from '../reducers/players.reducer';
import { Player, PlayersState } from '../models/players.model';
import { PlayersActions } from '../actions';


describe('PlayerReducer', () => {
  const TEST_INITIAL_STATE: PlayersState = {
    ids: ['123'],
    entities: {
      ['123']: {
        id: '123',
        name: 'Player_' + this.counter,
        description: 'description',
        s_name: 'Zizo',
        arrive: true,
        image: '',
        number: 8,
        phone: '0525597072',
        strength: 60,
        admin: true,
        injured: false,
        position: 'LR',
        birth: '3/4/1976'
      }
    }
  };

  it('should return the default state', () => {
    const action = {} as any;
    const state = playersReducer(undefined, action);

    expect(state).toBe(initialState);
  });

  it('should add a book', () => {
    const action = PlayersActions.addPlayer({
      player: {
        id: '1234',
        name: 'Player1',
        description: 'description',
        s_name: 'Zizo',
        arrive: true,
        image: '',
        number: 8,
        phone: '0525597072',
        strength: 60,
        admin: true,
        injured: false,
        position: 'LR',
        birth: '3/4/1976'
      }
    });
    const state = playersReducer(TEST_INITIAL_STATE, action);

    expect(state.ids.length).toEqual(2);
    expect(state.entities['1234'].name).toEqual('Player1');
  });

  it('should update a book', () => {
    const id = TEST_INITIAL_STATE.ids[0] as string;
    const action = PlayersActions.upsertPlayer({
      player: {
        id,
        name: 'updated',
        description: 'updated',
        s_name: 'Zizo',
        arrive: true,
        image: '',
        number: 8,
        phone: '0525597072',
        strength: 60,
        admin: true,
        injured: false,
        position: 'LR',
        birth: '3/4/1976'
      }
    });

    const state = playersReducer(TEST_INITIAL_STATE, action);
    expect(state.entities[id]).toEqual(
      jasmine.objectContaining({
        name: 'updated',
        description: 'updated'
      })
    );
  });

  it('should remove a book', () => {
    const id = TEST_INITIAL_STATE.ids[0] as string;
    const action = PlayersActions.deletePlayer({ id });
    const state = playersReducer(TEST_INITIAL_STATE, action);
    expect(state.entities[id]).toBe(undefined);
  });
});
