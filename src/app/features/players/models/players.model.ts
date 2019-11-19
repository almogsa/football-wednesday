export interface Player {
  id: string;
  name: string;
  done: boolean;
}

export type PlayersFilter = 'ALL' | 'DONE' | 'ACTIVE';

export interface PlayersState {
  items: Player[];
  filter: PlayersFilter;
}
