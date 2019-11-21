import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Player} from 'features/players/models';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  @Input() player: Player;
  @Output() delete: EventEmitter<string> =  new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }
  deletePlayer(player: Player) {
    this.delete.emit(player.id);
  }
}
