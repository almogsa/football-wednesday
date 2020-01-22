import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthSelectors} from 'core/auth';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {State} from '../../../features.state';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {


  @Output() login: EventEmitter<any> = new EventEmitter<any>();
  @Output() logout: EventEmitter<void> = new EventEmitter<void>();
  isAuthenticated$: Observable<boolean>;
  constructor(private store: Store<State>) {
  }

  ngOnInit() {
    this.isAuthenticated$ = this.store.pipe(select(AuthSelectors.selectIsAuthenticated));
  }

  handleSubmit($event: any) {
    this.login.emit({user: $event.form.controls.username.value, password: $event.form.controls.password.value});
  }

  handleLogout() {
    this.logout.emit();
  }
}
