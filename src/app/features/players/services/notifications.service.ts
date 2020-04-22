import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private subject$ =  new BehaviorSubject<any>('');
  sendMessage(message: string) {
    this.subject$.next(message);
    setTimeout(_ => {
      this.clearMessages();
    }, 4000);
  }
  clearMessages() {
    this.subject$.next('');
  }
  getMessage(): Observable<any> {
    return this.subject$.asObservable();
  }
}
