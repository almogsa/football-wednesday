import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../../../features.state';
import {Observable} from 'rxjs';
import {Player} from '../../models';
import {selectCaderPlayers, selectPlayersArrived} from '../../selectors';
import {PlayersActions} from '../../actions';

@Component({
  selector: 'app-players-container',
  templateUrl: './players-container.component.html',
  styleUrls: ['./players-container.component.scss']
})
export class PlayersContainerComponent implements OnInit {

  constructor( public store: Store<State> ) {

  }


  players$: Observable<Player[]>;
  title = 'football-wednesday';
  players: Player[];
  player: Player;
  benchPlayers: Player[];
  caderPlayers: Player[];

  ngOnInit() {
    this.store.pipe(select(selectPlayersArrived)).subscribe(players => {
      this.players = players.slice(0, 10);
      this.benchPlayers = players.slice(10);
    });
    this.store.pipe(select(selectCaderPlayers)).subscribe(players => {
      this.caderPlayers = players;
    });
    // this.player = {};
  }

  handleUpdate(player: Player) {
    this.store.dispatch(PlayersActions.updatePlayer({player: {id: player.id, changes: { arrive: true}}}));
  }

  handleDetails(player: Player) {
    console.log('player details: ', player)
    this.player = player;
  }
}
