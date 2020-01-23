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
  public processing = false;
  public success = false;
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
      this.login.emit({user: $event.form.controls.username.value.toLowerCase(), password: $event.form.controls.password.value.toLowerCase()});
    } , 1000);
  }

  handleLogout() {
    this.processing = true;
    setTimeout(() => {
      this.processing = false;
      this.logout.emit();
    }, 3000);
  }
}
