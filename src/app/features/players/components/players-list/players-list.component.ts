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
      strength: 6,
      admin: true,
      injured: false,
      position: 'LR'
    };
    this.store.dispatch(PlayersActions.addPlayer({player}));
    this.counter++;
  }

  deletePlayer(player: Player) {
    console.log('delete player', player.name);
    this.store.dispatch(PlayersActions.deletePlayer({id: player.id}));
  }

  updatePlayer() {
    this.store.dispatch((PlayersActions.updatePlayer({player: {id: '1', changes: { name: 'almog', arrive: true}}})));
  }

  resetPlayers() {
    this.store.dispatch((PlayersActions.resetPlayers()));
  }
}
