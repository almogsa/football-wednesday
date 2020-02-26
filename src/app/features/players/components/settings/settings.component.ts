import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthSelectors} from 'core/auth';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {State} from '../../../features.state';
import {Player} from '../../models';
import {PlayersActions} from '../../actions';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {


  @Output() login: EventEmitter<any> = new EventEmitter<any>();
  @Output() logout: EventEmitter<void> = new EventEmitter<void>();
  @Output() delete: EventEmitter<string> = new EventEmitter<string>();
  isAuthenticated$: Observable<boolean>;
  public processing = false;
  public success = false;
  counter = 1;
  constructor(private store: Store<State>) {
  }

  ngOnInit() {
    this.isAuthenticated$ = this.store.pipe(select(AuthSelectors.selectIsAuthenticated));
  }

  handleSubmit($event: any) {
    this.processing = true;
    setTimeout(() => {
      this.processing = false;
      this.success = true;
      this.login.emit({
        user: $event.form.controls.username.value.toLowerCase(),
        password: $event.form.controls.password.value.toLowerCase()
      });
    }, 1000);
  }

  handleLogout() {
    this.processing = true;
    setTimeout(() => {
      this.processing = false;
      this.logout.emit();
    }, 3000);
  }

  handleDeletePlayer(player: Player) {
    this.delete.emit(player.id);
  }

  resetPlayers() {
    this.store.dispatch((PlayersActions.resetPlayers()));
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
    // this.playerDetails = {id: this.counter.toString(), arrive: false,
    //   admin: false, captain: false, avatar: '../../../../../assets/empty_profile.png'};
    this.counter++;
  }
}
