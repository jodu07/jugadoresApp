import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Player } from 'src/app/interfaces/player.interface';

@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.sass']
})
export class PlayerTableComponent{
  private playersDb: AngularFireList<Player>;

  constructor(private db: AngularFireDatabase) {
    this.playersDb = this.db.list('/players', ref => ref.orderByChild('name'));
  }

  getPlayers(): Observable<Player[]>{
     return this.playersDb.snapshotChanges().pipe(
       map(changes => {
         return changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }))
       })
     )
   }

   addPlayer(player: Player){
     return this.playersDb.push(player)
   }


   deletePlayer(id: string){
     this.db.list('/players').remove(id);
   }

   editPlayer(newPlayerData){
     const $key = newPlayerData.$key;
     delete(newPlayerData.$key);
     this.db.list('/players').update($key, newPlayerData);
   }


}
