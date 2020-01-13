import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {Player} from 'features/players/models';
import {select, Store} from '@ngrx/store';
import {State} from 'features';
import {PlayersActions} from 'features/players/actions';

import {selectAllPlayers} from 'features/players/selectors';
import {SliderCalloutTrigger, SliderSize, SliderSnap, SliderStyle} from '@ux-aspects/ux-aspects';

@Component({
  selector: 'app-players-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss'],
})
export class PlayersListComponent implements OnInit {

  players$: Observable<Player[]>;
  selected: Player[] = [];
  @Output() back: EventEmitter<void> = new EventEmitter<void>();
  @Output() update: EventEmitter<Player> = new EventEmitter<Player>();
  @Output() delete: EventEmitter<string> = new EventEmitter<string>();
  counter = 1;
  slider: any;
  showModal = false;
  playerDetails: Partial<Player>;
  constructor(  public store: Store<State>) {

  }

  ngOnInit() {
    this.players$ = this.store.pipe(select(selectAllPlayers));
    this.slider = {
      value: 60,
      options: {
        handles: {
          style: SliderStyle.Line,
          callout: {
            trigger: SliderCalloutTrigger.Hover,
            formatter: value => value ? value.toFixed(0) : value
          }
        },
        track: {
          min: 0,
          max: 100,
          height: SliderSize.Narrow,
          ticks: {
            major: {
              steps: 50,

            },
            minor: {
              steps: 5,
            }
          },
          colors: {
            lower: ['#fdf690', '#3BAA43']
          }
        }
      }
    };

  }

  addPlayer() {
    console.log('Add Player');
    const player: Player = {
      id: this.counter.toString(),
      name: 'Player_' + this.counter,
      description: 'description',
      s_name: 'Zizo',
      arrive: false,
      image: '',
      number: 8,
      phone: '0525597072',
      strength: 60,
      admin: true,
      injured: false,
      position: 'LR',
      birth: '3/4/1976',
      goals: 0,
      manOfTheWeek: false,
      avatar: '../../../../../assets/empty_profile.png',
      captain: false
    };
    this.store.dispatch(PlayersActions.addPlayer({player}));
    this.counter++;
    // https://cdn5.vectorstock.com/i/1000x1000/20/84/avatar-man-soccer-player-graphic-vector-9422084.jpg
    // https://www.w3schools.com/howto/img_avatar.png
    this.playerDetails = {id: this.counter.toString(), arrive: false, captain: false, avatar: '../../../../../assets/empty_profile.png'};
  }

  handleDeletePlayer(player: Player) {
    this.delete.emit(player.id);
  }
  resetPlayers() {
    this.store.dispatch((PlayersActions.resetPlayers()));
  }
  handleBack() {
    console.log('handle back');
    this.playerDetails = null;
    this.back.emit();
  }
  handleView(player: Player) {
    console.log('handle view' , player);
    this.showModal = true;
    this.playerDetails = player;
  }
  handleUpdatePlayer(player: Player) {
    this.update.emit(player);
  }
}
