import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent, PlayersListComponent, FieldComponent } from 'features/players/components';
import {
  AccessibilityModule,
  ColorServiceModule,
  colorSets, FlippableCardModule,
  HoverActionModule, IconModule,
  SelectionModule, SliderModule,
  SparkModule, TabsetModule, TabsetService,
  TooltipModule,
} from '@ux-aspects/ux-aspects';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { PlayersContainerComponent } from './components/players-container/players-container.component';
import { PlayerDetailsComponent } from './components/player-details/player-details.component';
import {RouterModule, Routes} from '@angular/router';
import { SettingsComponent } from './components/settings/settings.component';
import { PlayerViewComponent } from './components/player-view/player-view.component';
import {PlayersEffects} from './effects/players.effects';
import {EffectsModule} from '@ngrx/effects';
import { LineUpComponent } from './components/line-up/line-up.component';



const appRoutes: Routes = [
  { path: 'field', component: PlayersContainerComponent },
  { path: 'details', component: PlayersContainerComponent },
];


@NgModule({
  declarations: [PlayerComponent, PlayersListComponent, FieldComponent,
    PlayersContainerComponent, PlayerDetailsComponent, SettingsComponent, PlayerViewComponent, LineUpComponent],
  exports: [
    PlayersListComponent,
    FieldComponent,
    PlayerComponent,
    PlayersContainerComponent
  ],
  providers: [TabsetService],
  imports: [
    CommonModule,
    ColorServiceModule.forRoot(colorSets.keppel),
    IconModule,
    AccessibilityModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HoverActionModule,
    SelectionModule,
    SparkModule,
    TooltipModule,
    TabsetModule,
    FontAwesomeModule,
    FlippableCardModule,
    SliderModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ]
})
export class PlayersModule { }
