import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './components/player/player.component';
import { PlayersListComponent } from './components/players-list/players-list.component';


@NgModule({
  declarations: [PlayerComponent, PlayersListComponent],
  exports: [
    PlayersListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PlayersModule { }
