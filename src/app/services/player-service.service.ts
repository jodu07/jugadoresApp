import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Player } from '../interfaces/player.interface';

@Injectable({
  providedIn: 'root'
})
export class PlayerServiceService {
  private playersDb: AngularFireList<Player>;

  constructor(private db: AngularFireDatabase) {
    this.playersDb = this.db.list('/players', ref => ref.orderByChild('name'));
  }

  getPlayers(): Observable<Player[]>{
     return this.playersDb.snapshotChanges().pipe(
       map((changes:any) => {
         return changes.map((c: { payload: { key: any; val: () => any; }; }) => ({ $key: c.payload.key, ...c.payload.val() }))
       })
     )
   }

   addPlayer(player: Player){
     return this.playersDb.push(player)
   }


   deletePlayer(id: string){
     this.db.list('/players').remove(id);
   }

   editPlayer(newPlayerData:any){
     const $key = newPlayerData.$key;
     delete(newPlayerData.$key);
     this.db.list('/players').update($key, newPlayerData);
   }


}
