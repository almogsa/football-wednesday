import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Player} from 'features/players/models';
import {AngularFireAuth} from '@angular/fire/auth';
import {catchError, map, switchMap} from 'rxjs/operators';
import {from} from 'rxjs';


const FIREBASE_DB = 'players';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(private firestore: AngularFirestore, public afAuth: AngularFireAuth) {
  }


  auth() {
    return this.afAuth.auth.signInAnonymously();
    /*.catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(' Firebase failed to authenticate ', errorCode, errorMessage);
    });*/
  }

  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      // localStorage.removeItem('user');
    });
  }

  getPlayers() {
    return this.firestore.collection(FIREBASE_DB).snapshotChanges();
  }

  addPlayer(player: Player) {
    return this.firestore.collection(FIREBASE_DB).add(player);
    // .catch(err => {
    //   throw err;
    // });
  }

  updatePlayer(player: Player) {
    return this.firestore.doc(FIREBASE_DB + '/' + player.id).update(player);
  }

  deletePlayer(playerId: string) {
    return this.firestore.doc(FIREBASE_DB + '/' + playerId).delete();
    /*.catch(err => {
     console.log('error occurred during deleting player' , err.message);
     throw new Error('error occurred during deleting player');
   });*/
  }

  queryPlayers() {
    return this.firestore.collection(FIREBASE_DB, ref => ref.where('arrive', '==', true))
      .valueChanges();
  }

  resetPlayers() {
     return this.firestore.collection(FIREBASE_DB).get().pipe(
        switchMap(response  => {
          const batch = this.firestore.firestore.batch();
          response.docs.forEach((doc) => {
            const docRef = this.firestore.firestore.doc(FIREBASE_DB + '/' + doc.id);
            batch.update(docRef, {arrive: false});
            // console.log(doc);
          });
          return from(batch.commit());
        }),
        catchError(error => {
          // reject(error)
          throw error;
        }));
  }
}
