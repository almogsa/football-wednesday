import {Injectable} from '@angular/core';

import {Store} from '@ngrx/store';
import * as fromRoot from '../core.state';
import {environment} from '../../../environments/environment';
import {PlayersService} from '../../features/players/services/players.service';

export const API = 'football';

@Injectable({
  providedIn: 'root',
})

export class DevToolsService {
  private id = 0;

  constructor( private store: Store<fromRoot.AppState>, private playerSerivce: PlayersService) {
    if (!environment.production) {
      console.log('***STARTING DEV TOOLS SERVICE***');
      window[API] = {};
      this.init();
    }
  }
  startFootball = () => {
    console.log('load footabll data');
    // this.store.dispatch()
  }
  getService = () => {
    return this.playerSerivce;
    // this.store.dispatch()
  }
  getArrivePlayers = () => {
    return this.playerSerivce.queryPlayers().subscribe(x => console.log(x));
  }


  init() {
    const api = {
      startFootball: () => this.startFootball,
      getService: () => this.getService,
      getArrivePlayers: () => this.getArrivePlayers()
    };
    window[API].api = api;
  }

  generateData() {
    console.log('generate data ');

  }
}

