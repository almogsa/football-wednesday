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
  public lineUp = false;
  public lineUpArrays = [];
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

  lineUpHandler() {
    this.lineUp = !this.lineUp;
    const players = this.arrive.concat(this.bench);
    let numOfSets = 0;

    //// sort by property
    this.sortByProperty(players, 'strength');
    // players.sort((a, b) => b.strength - a.strength);


    if (players.length % SET_PLAYERS !== 0) {
      const remainder = players.length % SET_PLAYERS;
      numOfSets = Math.floor(players.length / SET_PLAYERS) + 1;
      for (let i = 0; i < SET_PLAYERS - remainder; i++) {
        const copyElem = i > 0 ? {... players[i + numOfSets]} : {...players[i]};
        copyElem.name = 'מזמין ' + (i + 1);
        copyElem.avatar = this.avatar;
        copyElem.captain  = false;
        players.push(copyElem);
      }
    }
    numOfSets = players.length / SET_PLAYERS;
    this.sortByProperty(players, 'strength');

    // array of sums
    // let sums = [0,0,0];
    const sums = Array(numOfSets).fill(0);
    // final array of 3 arrays
    // let arrays = [[],[],[]];
    const arrays = Array(numOfSets).fill(null).map(() => new Array());

    for (const item of players) {
      // get index of the smallest sum
      // let index =  sums.indexOf(Math.min.apply(null,sums));
      const index = sums.indexOf(Math.min(...sums));
      // add current item size to corresponding sum
      sums[index] += item.strength;
      // add item to corresponding array
      arrays[index].push(item);
    }
    this.lineUpArrays = arrays;
  }
  sortByProperty(arr, property) {
    arr.sort((a, b) => b[property] - a[property]);
  }
}
