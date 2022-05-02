import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Team } from '../interfaces/team.interface';

@Injectable({
  providedIn: 'root'
})
export class TeamServiceService {

  private teamsDb: AngularFireList<Team>;

  constructor(private db: AngularFireDatabase) {
    this.teamsDb = this.db.list('/teams', ref => ref.orderByChild('name'));
  }

  getTeams(): Observable<Team[]>{
    return this.teamsDb.snapshotChanges().pipe(
      map((changes:any) => {
        return changes.map((c: { payload: { key: any; val: () => any; }; }) => ({ $key: c.payload.key, ...c.payload.val() }))
      })
    )
  }

  addTeam(team: Team){
    return this.teamsDb.push(team)
  }


  deleteTeam(id: string){
    this.db.list('/teams').remove(id);
  }

  editTeam(newTeamData:any){
    const $key = newTeamData.$key;
    delete(newTeamData.$key);
    this.db.list('/teams').update($key, newTeamData);
  }

}
