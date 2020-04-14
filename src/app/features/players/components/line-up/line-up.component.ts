import {Component, Input, OnChanges, OnInit, Renderer2, SimpleChanges, TemplateRef, ViewChild} from '@angular/core';
import {Player} from '../../models';


const SET_PLAYERS = 4;


@Component({
  selector: 'app-line-up',
  templateUrl: './line-up.component.html',
  styleUrls: ['./line-up.component.scss']
})

export class LineUpComponent implements OnInit, OnChanges {

  @Input() players: Player[];
  avatar = '../../../../../assets/empty_profile.png';
  public lineUpArrays = [];
  public myContext = {};
  @ViewChild('sums', {static: false}) sums: TemplateRef<any>;
  constructor(private renderer: Renderer2) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.players.currentValue.length > 8) {
      this.lineUpHandler();
    }
  }
  ngOnInit() {
  }
  lineUpHandler() {
    const players = this.players;
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
    this.myContext = sums;

    console.log(arrays);
    console.log(sums);
  }
  sortByProperty(arr, property) {
    arr.sort((a, b) => b[property] - a[property]);
  }
}
