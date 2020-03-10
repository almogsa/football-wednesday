import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import * as fromRoot from 'features/players/models';
import {Player, PlayersState} from 'features/players/models';
import {select, Store} from '@ngrx/store';
import {isLoading, selectAllPlayers, selectCaderPlayers, selectPlayersArrived} from 'features/players/selectors';
import {FeaturesState, State} from 'features';
import {PlayersActions} from './features/players/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {
  loading = true;
  constructor(public store: Store<State>) {

  }

  ngOnInit() {

    this.store.pipe(select(isLoading)).subscribe(result => {
      this.loading = result;
      console.log('loading', result);
    });
    setTimeout(() => {
      // this.loading = false;
    }, 4000);
  }

}
