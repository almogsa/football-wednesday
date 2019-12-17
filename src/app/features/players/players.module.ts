import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent, PlayersListComponent, FieldComponent } from 'features/players/components';
import {
  AccessibilityModule,
  ColorServiceModule,
  colorSets, FlippableCardModule,
  HoverActionModule, IconModule,
  SelectionModule,
  SparkModule, TabsetModule,
  TooltipModule,
} from '@ux-aspects/ux-aspects';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { PlayersContainerComponent } from './components/players-container/players-container.component';
import { PlayerDetailsComponent } from './components/player-details/player-details.component';



@NgModule({
  declarations: [PlayerComponent, PlayersListComponent, FieldComponent, PlayersContainerComponent, PlayerDetailsComponent],
  exports: [
    PlayersListComponent,
    FieldComponent,
    PlayerComponent,
    PlayersContainerComponent
  ],
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
  ]
})
export class PlayersModule { }
