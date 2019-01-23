import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TeamHomePage } from '../team-home/team-home';
import { EliteScheduleApi } from '../../providers/elite-schedule-api/elite-schedule-api';

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {
  public game: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private eliteScheduleApi: EliteScheduleApi) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad - GamePage');
    this.game = this.navParams.data;
    console.log(this.game);
  }

  teamTapped(teamId) {
    let tourneyData = this.eliteScheduleApi.getCurrentTourney();
    let team = tourneyData.teams.find(t => t.id === teamId);
    this.navCtrl.push(TeamHomePage, team);
  }
}
