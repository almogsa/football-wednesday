import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Player} from 'features/players/models';
import {Observable, of} from 'rxjs';
import {Update} from '@ngrx/entity';


const FIREBASE_DB = 'players';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(private firestore: AngularFirestore) {
  }

  test(): Observable<any> {
    return of([1, 2, 3]);
  }

  getPlayers() {
    console.log('get player service');
    return this.firestore.collection(FIREBASE_DB).snapshotChanges();
  }

  addPlayer(player: Player) {
    return this.firestore.collection(FIREBASE_DB).add(player);
  }

  updatePlayer(player: Player) {
    return this.firestore.doc(FIREBASE_DB + '/' + player.id).update(player);
  }

  deletePlayer(playerId: string) {
    this.firestore.doc(FIREBASE_DB + '/' + playerId).delete();
  }
  queryPlayers() {
    return this.firestore.collection(FIREBASE_DB, ref => ref.where('arrive', '==', true))
      .valueChanges();
  }
  resetPlayers() {
    this.firestore.collection(FIREBASE_DB).get().subscribe(response => {
      const batch = this.firestore.firestore.batch();
      response.docs.forEach((doc) => {
        const docRef = this.firestore.firestore.doc(FIREBASE_DB + '/' + doc.id);
        batch.update(docRef, {arrive: false});
        console.log(doc);
      });
      batch.commit();
    });
  }
}
