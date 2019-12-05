import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Player} from 'features/players/models';
import {select, Store} from '@ngrx/store';
import {selectAllPlayers, selectCaderPlayers, selectPlayersArrived} from 'features/players/selectors';
import {State} from 'features';
import {PlayersActions} from './features/players/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {

  constructor( public store: Store<State> ) {

  }



  players$: Observable<Player[]>;
  title = 'football-wednesday';
  players: Player[];
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
  }

  handleUpdate(player: Player) {
    this.store.dispatch(PlayersActions.updatePlayer({player: {id: player.id, changes: { arrive: true}}}));
  }
}
