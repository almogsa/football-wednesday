import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Player} from 'features/players/models';
import {event} from 'd3-selection';
import {animate, state, style, transition, trigger} from '@angular/animations';

const SET_PLAYERS = 4;

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('simpleFadeAnimation', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({opacity: 1})),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({opacity: 0}),
        animate(500)
      ]),

    ])
  ]
})

export class FieldComponent implements OnInit {

  @Input() arrive: Player[];
  @Input() isAuthenticated: boolean;
  @Input() bench: Player[];
  @Input() cader: Player[];
  @Output() update: EventEmitter<Player> = new EventEmitter<Player>();
  @Output() delete: EventEmitter<string> = new EventEmitter<string>();
  @Output() details: EventEmitter<Player> = new EventEmitter<Player>();
  avatar = '../../../../../assets/empty_profile.png';
  playerDetails: Player;
  constructor() {
    // console.log('field players : ', this.cader);
  }

  ngOnInit() {
  }

  handleUpdate(player: Player) {
    console.log('field component handle update ', player);
    this.update.emit(player);
  }

  handleArrivePlayer(player: Player) {
    this.update.emit({...player, arrive: true});
  }
  handleDetails(player: Player) {
    this.playerDetails = player;
    // this.details.emit(player);
  }
  handleBack() {
    this.playerDetails = null;
  }
  handleDelete($event) {
    this.delete.emit($event);
  }
}
