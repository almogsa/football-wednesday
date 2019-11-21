import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './components/player/player.component';
import { PlayersListComponent } from './components/players-list/players-list.component';
import {
  AccessibilityModule,
  ColorServiceModule,
  colorSets,
  HoverActionModule, IconModule,
  SelectionModule,
  SparkModule,
  TooltipModule
} from '@ux-aspects/ux-aspects';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [PlayerComponent, PlayersListComponent],
  exports: [
    PlayersListComponent
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
    FontAwesomeModule
  ]
})
export class PlayersModule { }
