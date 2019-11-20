import { actionPlayersDeleteOne, actionPlayersUpsertOne } from './players.actions';

describe('Books Actions', () => {
  it('should create ActionBooksUpsertOne action', () => {
    const action = actionPlayersUpsertOne({
      player: {
        id: '1',
        title: 'test',
        author: 'test',
        description: ''
      }
    });
    expect(action.type).toEqual(actionPlayersUpsertOne.type);
    expect(action.player).toEqual(
      jasmine.objectContaining({
        id: '1',
        title: 'test',
        author: 'test',
        description: ''
      })
    );
  });

  it('should create ActionBooksDeleteOne action', () => {
    const action = actionPlayersDeleteOne({ id: '1' });
    expect(action.type).toEqual(actionPlayersDeleteOne.type);
    expect(action.id).toEqual('1');
  });
});
