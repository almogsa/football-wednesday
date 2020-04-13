import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Player} from 'features/players/models';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  @Input() player: Player;
  @Input() animate = false;
  @Output() delete: EventEmitter<string> =  new EventEmitter<string>();
  @Output() update: EventEmitter<Player> =  new EventEmitter<Player>();

  clicked = false;
  constructor() { }

  ngOnInit() {
  }
  deletePlayer(player: Player) {
    this.delete.emit(player.id);
  }

  handleClick(player: Player) {
    // console.log(' Footer click on player: ', player);
    this.clicked = true;
    if (this.animate) {
      setTimeout(_ => {
        this.clicked = false;
        this.update.emit(player);
      }, 1000);
    } else {
      this.clicked = false;
      this.update.emit(player);
    }
  }

}
