import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerTableComponent } from './components/player-table/player-table.component';
import { TeamTableComponent } from './components/team-table/team-table.component';
import { PlayerDialogComponent } from './components/player-dialog/player-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerTableComponent,
    TeamTableComponent,
    PlayerDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
