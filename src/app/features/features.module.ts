import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {FEATURE_NAME, reducers} from './features.state';
import {PlayersModule} from './players/players.module';
import {PlayersListComponent} from './players/components/players-list/players-list.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PlayersModule,
    StoreModule.forFeature(FEATURE_NAME, reducers),
  ],
  exports: [
    PlayersListComponent
  ],
})
export class FeaturesModule { }
