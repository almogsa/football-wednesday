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
  counter = 1;
  slider:any;
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
       /* track: {
          height: SliderSize.Narrow,
          ticks: {
            major: {
              steps: 50
            },
            minor: {
              steps: 10
            }
          },
          colors: {
            lower: '#f2f2f2',
            range: 'rgba(96,121,141, 0.75)',
            higher: '#f2f2f2'
          }
        }*/
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
  }

  onDelete(playerId: string) {
    console.log('delete player', playerId);
    this.store.dispatch(PlayersActions.deletePlayer({id: playerId}));
  }

  updatePlayer() {
    this.store.dispatch((PlayersActions.updatePlayer({player: {id: '1', changes: { name: 'almog', arrive: true}}})));
  }

  resetPlayers() {
    this.store.dispatch((PlayersActions.resetPlayers()));
  }
  handleBack() {
    console.log('handle back');
    this.back.emit();
  }
}
