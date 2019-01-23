import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TeamHomePage } from '../team-home/team-home';
import { EliteScheduleApi } from '../../providers/elite-schedule-api/elite-schedule-api';



@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {

  public teams = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private eliteScheduleApi: EliteScheduleApi) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamsPage');
    let selectedTourney = this.navParams.data;
    this.eliteScheduleApi.getTournamentData(selectedTourney.id).subscribe(
      data => {
        this.teams = data.teams;
      });
  }

  itemTapped($event, team) {
    this.navCtrl.push(TeamHomePage, team);
  }

}
