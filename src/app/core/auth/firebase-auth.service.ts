import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {from} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  constructor(private afAuth: AngularFireAuth) {
  }


  auth() {
    return from(this.afAuth.auth.signInAnonymously());
  }
  signInWithEmailAndPassword(user, password) {
    return from(this.afAuth.auth.signInWithEmailAndPassword(user + '@almogdomain.com', password + '123456'));
  }

  SignOut() {
    return from(this.afAuth.auth.signOut());
  }
}
