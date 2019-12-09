import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Player} from 'features/players/models';
import {event} from 'd3-selection';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {

  @Input() arrive: Player[];
  @Input() bench: Player[];
  @Input() cader: Player[];
  @Output() update: EventEmitter<Player> = new EventEmitter<Player>();
  @Output() details: EventEmitter<Player> = new EventEmitter<Player>();
  avatar = '../../../../../assets/empty_profile.png';

  constructor() {
    // console.log('field players : ', this.cader);
  }

  ngOnInit() {
  }

  handleUpdate(player: Player) {
    this.update.emit(player);
  }

  handleDetails(player: Player) {
    this.details.emit(player);
  }
}
