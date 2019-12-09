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

  constructor() {

  }

  ngOnInit() {
  }

}
