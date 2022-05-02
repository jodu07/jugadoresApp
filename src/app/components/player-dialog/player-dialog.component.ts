import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Player } from 'src/app/interfaces/player.interface';
import { Countries, SquadNumber } from '../../interfaces/player.interface';
import { PlayerServiceService } from '../../services/player-service.service';
import { TeamServiceService } from '../../services/team-service.service';

@Component({
  selector: 'app-player-dialog',
  templateUrl: './player-dialog.component.html',
  styleUrls: ['./player-dialog.component.sass']
})
export class PlayerDialogComponent implements OnInit {

  @Input() player: Player[]=[]; 
  @Output()closeDialog: EventEmitter<boolean> = new EventEmitter();
  private team:any;
  public countries = Object.keys(Countries).map(key => ({label: key, key: Countries[key]}))
  public squadNumber = Object.keys(SquadNumber)
  .slice(Object.keys(SquadNumber).length / 2)
  .map(key =>({
    label: key,
    key: SquadNumber[key]
  }));
  constructor(private playerService: PlayerServiceService, private teamService: TeamServiceService) { }

  ngOnInit(): void {
    this.teamService
    .getTeams()
    .pipe(take(1))
    .subscribe((teams:any) =>{
      if(teams.length > 0){
        this.team = teams[0];
      }
    });

  }

  private newPlayer(playerFormValue:any){
    const key = this.playerService.addPlayer(playerFormValue).key
    const playerFormValuekey = {
      ...playerFormValue,
      key
    }
    const formattedTeam = {
      ...this.team,
      players: [...(this.team.players ? this.team.players : []), playerFormValuekey]
    };
    this.teamService.editTeam(formattedTeam);
  }

  private editPlayer(playerFormValue:any){
    const playerFormValueWithKey = {...playerFormValue, $key: this.player.$key};
    const playerFormValueWithFormattedKey = { ...playerFormValue, key: this.player.$key};
    delete playerFormValueWithFormattedKey.$key;
    const moddifiedPlayers = this.team.players ?
    this.team.players.map((player:any) =>{
      return player.key === this.player.$key ? playerFormValueWithKey : player;
    }) 
    : this.team.players;
    const formattedTeam = {
      ...this.team,
      players: [...(moddifiedPlayers ? moddifiedPlayers : [playerFormValueWithFormattedKey])]
    };
    this.playerService.editPlayer(playerFormValueWithKey);
    this.teamService.editTeam(formattedTeam);

  }

  onSubmit(playerForm: NgForm){
    const playerFormValue = {...playerForm.value};
    if (playerForm.valid){
      playerFormValue.leftFooted = playerFormValue.leftFooted === '' ? false : playerFormValue.leftFooted;
      
    }
    if(this.player){
      this.editPlayer(playerFormValue);
    }else{
      this.newPlayer(playerFormValue);
    }
    
    window.location.replace('#');

    
  }

  onClose(){
    this.closeDialog.emit(true);
  }

}

