import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Player} from '../../models';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-player-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.scss']
})
export class PlayerDetailsComponent implements OnInit {

  @Input() player: Player;
  @Input() isAuthenticated: boolean;
  @Output() delete: EventEmitter<string> = new EventEmitter<string>();
  @Output() update: EventEmitter<Player> = new EventEmitter<Player>();
  @Output() back: EventEmitter<void> = new EventEmitter<void>();
  public _player: Player;
  slider: any;


  constructor() {
  }

  ngOnInit() {
    console.log('is Aut', this.isAuthenticated)
    this._player = {...this.player};
  }

  deletePlayer(player: Player) {
    this.delete.emit(player.id);
  }

  handleUpdate(player: Player) {
    console.log(' Update Player: ', player);
    this.update.emit(player);
    this.handleBack();
  }

  handleBack() {
    this.back.emit();
  }
  handleDelete(player: Player) {
    this.delete.emit(player.id);
  }
  sliderChanged($event) {
    this._player.strength = Math.floor($event);
  }

}
