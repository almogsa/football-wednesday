import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from './core.state';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // ngrx
    StoreModule.forRoot(reducers, { metaReducers }),
  ]
})
export class CoreModule { }
