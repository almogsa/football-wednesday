import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Player} from 'features/players/models';
import {select, Store} from '@ngrx/store';
import {State} from 'features';
import {PlayersActions} from 'features/players/actions';

import {selectAllPlayers} from 'features/players/selectors';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss']
})
export class PlayersListComponent implements OnInit {

  players$: Observable<Player[]>;
  selected: Player[] = [];
  counter = 1;
  constructor(  public store: Store<State>) {

  }

  ngOnInit() {
    this.players$ = this.store.pipe(select(selectAllPlayers));
  }

  addPlayer() {
    console.log('Add Player');
    const player: Player = {
      id: this.counter.toString(),
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
      birth: '3/4/1976',
      avatar: '../../../../../assets/empty_profile.png'
    };
    this.store.dispatch(PlayersActions.addPlayer({player}));
    this.counter++;
  }

  onDelete(playerId: string) {
    console.log('delete player', playerId);
    this.store.dispatch(PlayersActions.deletePlayer({id: playerId}));
  }

  updatePlayer() {
    this.store.dispatch((PlayersActions.updatePlayer({player: {id: '1', changes: { name: 'almog', arrive: true}}})));
  }

  resetPlayers() {
    this.store.dispatch((PlayersActions.resetPlayers()));
  }
}
