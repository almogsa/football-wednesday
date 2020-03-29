import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Player} from '../../models';

@Component({
  selector: 'app-player-view',
  templateUrl: './player-view.component.html',
  styleUrls: ['./player-view.component.scss']
})
export class PlayerViewComponent implements OnInit {

  @Input() player: Player;
  @Output() viewPlayer = new EventEmitter<Player>();
  constructor() { }

  ngOnInit() {
  }
  handleViewPlayer() {
    this.viewPlayer.emit(this.player);
  }
}
