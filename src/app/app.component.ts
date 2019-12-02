import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Player} from 'features/players/models';
import {select, Store} from '@ngrx/store';
import {selectAllPlayers} from 'features/players/selectors';
import {State} from 'features';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {

  constructor( public store: Store<State> ){

  }
  players$: Observable<Player[]>;
  title = 'football-wednesday';
  players: Player[]

  ngOnInit() {
     this.store.pipe(select(selectAllPlayers)).subscribe(players => {
       this.players= players;
     });
  }
  
}
