import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {FEATURE_NAME, reducers} from './features.state';
import {PlayersModule} from './players/players.module';
import {PlayersListComponent} from './players/components/players-list/players-list.component';
import {FieldComponent} from './players/components';
import {EffectsModule} from '@ngrx/effects';
import {PlayersEffects} from './players/effects/players.effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PlayersModule,
    StoreModule.forFeature(FEATURE_NAME, reducers),
    EffectsModule.forFeature([
      PlayersEffects,
    ]),
  ],
  exports: [
    PlayersListComponent, FieldComponent
  ],
})
export class FeaturesModule { }
