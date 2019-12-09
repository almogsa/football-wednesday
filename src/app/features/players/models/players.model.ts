import {EntityState} from '@ngrx/entity';

export interface Player {
  id: string;
  description: string;
  name: string;
  s_name: string;
  admin: boolean;
  arrive: boolean;
  number: number;
  strength: number;
  phone: string;
  image: string;
  injured: boolean;
  position: string;
  birth: string;
  goals: number;
  manOfTheWeek: boolean;
  avatar: string;
}

export type PlayersFilter = 'ALL' | 'DONE' | 'ACTIVE';

// export interface PlayersState {
//   items: Player[];
//   filter: PlayersFilter;
// }
export interface PlayersState extends EntityState<Player> {}
