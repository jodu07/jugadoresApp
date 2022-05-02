import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { TeamServiceService, TeamsTableHeaders } from '../../services/team-service.service';
import { Team } from 'src/app/interfaces/team.interface';
import { Countries } from '../../interfaces/player.interface';

@Component({
  selector: 'app-team-table',
  templateUrl: './team-table.component.html',
  styleUrls: ['./team-table.component.sass']
})
export class TeamTableComponent implements OnInit {

  public teams$!: Observable<Team[]>;
  public tableHeaders = TeamsTableHeaders;

  constructor(private teamService: TeamServiceService) { }

  ngOnInit(): void {
    this.teams$ = this.teamService.getTeams();
    this.teamService.getTeams().pipe(take(1)).subscribe(teams => {
      if (teams.length == 0){
        const team: Team = {
          name: 'MyAmazingTeam',
          country: Countries.Colombia,
          players: []=[]
        };
        this.teamService.addTeam(team);   //agregar a la base de datos
      }
    })
  }

}

