import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Player } from 'features/players/models';


const FIREBASE_DB = 'players';
@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(private firestore: AngularFirestore) { }


  getPlayers() {
    return this.firestore.collection(FIREBASE_DB).snapshotChanges();
}
createPlayer(player: Player){
  return this.firestore.collection(FIREBASE_DB).add(player);
}
updatePolicy(player: Player){
  delete player.id;
  this.firestore.doc(FIREBASE_DB +'/' + player.id).update(player);
}
deletePolicy(playerId: string){
  this.firestore.doc(FIREBASE_DB +'/' + playerId).delete();
}
}
