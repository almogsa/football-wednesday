import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Player} from '../../models';

@Component({
  selector: 'app-player-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.scss']
})
export class PlayerDetailsComponent implements OnInit {

  @Input() player: Player;
  @Output() delete: EventEmitter<string> = new EventEmitter<string>();
  @Output() update: EventEmitter<Player> = new EventEmitter<Player>();
  @Output() back: EventEmitter<void> = new EventEmitter<void>();


  constructor() {
  }

  ngOnInit() {
  }

  deletePlayer(player: Player) {
    this.delete.emit(player.id);
  }

  handleClick(player: Player) {
    console.log(' Footer click on player: ', player);
    this.update.emit(player);
  }

  handleBack() {
    console.log('handle back');
    this.back.emit();
  }

}
