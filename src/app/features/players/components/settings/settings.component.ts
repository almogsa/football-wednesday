import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
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
  @ViewChild('resetButton', {static: false}) resetButton: ElementRef;
  isAuthenticated$: Observable<boolean>;
  public processing = false;
  public success = false;
  public reset = false;
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
    this.reset = true;
    this.resetButton.nativeElement.innerText = '';
    setTimeout(_ => {
      this.store.dispatch((PlayersActions.resetPlayers()));
      if (this.resetButton) {
        this.resetButton.nativeElement.innerText = 'Done!';
        this.resetButton.nativeElement.classList.remove('btn-danger');
        this.resetButton.nativeElement.classList.add('btn-success');
      }
      this.reset = false;
    }, 3000);
  }
  addPlayer() {
    console.log('Add Player');
    const player: Player = {
      id: this.counter.toString(),
      name: 'Player_' + this.counter,
      description: '',
      s_name: '',
      arrive: false,
      image: '',
      number: 0,
      phone: '',
      strength: 50,
      admin: false,
      injured: false,
      position: 'LR',
      birth: '1/1/1974',
      goals: 0,
      manOfTheWeek: false,
      avatar: '../../../../../assets/empty_profile.png',
      captain: false
    };
    this.store.dispatch(PlayersActions.addPlayer({player}));
    this.counter++;
  }
}
