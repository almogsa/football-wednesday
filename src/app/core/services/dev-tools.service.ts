import {Injectable} from '@angular/core';

import {Store} from '@ngrx/store';
import * as fromRoot from '../core.state';
import {environment} from '../../../environments/environment';

export const API = 'football';

@Injectable({
  providedIn: 'root',
})

export class DevToolsService {
  private id = 0;

  constructor( private store: Store<fromRoot.AppState>) {
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


  init() {
    const api = {
      startFootball: () => this.startFootball,
    };
    window[API].api = api;
  }

  generateData() {
    console.log('generate data ');

  }
}

