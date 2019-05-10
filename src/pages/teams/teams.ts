import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { TeamHomePage } from '../team-home/team-home';
import { EliteScheduleApi } from '../../providers/elite-schedule-api/elite-schedule-api';
import * as _ from 'lodash';
import { callLifecycleHooksChildrenFirst } from '@angular/core/src/view/provider';


@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {

  public teams = [];
  private allTeams: any;
  private allTeamDivisions: any;

  constructor(
    private loadingController: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private eliteScheduleApi: EliteScheduleApi) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamsPage');
    let selectedTourney = this.navParams.data;

    let loader = this.loadingController.create({
      content: 'Getting data..'
    });

    loader.present().then(() => {
      this.eliteScheduleApi.getTournamentData(selectedTourney.id).subscribe(
        data => {
          this.allTeams = data.teams;
  
          this.allTeamDivisions = 
            _.chain(data.teams)
              .groupBy('division')
              .toPairs()
              .map(item => _.zipObject(['divisionName', 'divisionTeams'], item))
              .value();
          
          this.teams = this.allTeamDivisions;
          console.log('Division teams ', this.teams);

          loader.dismiss();
        });
      });
  }

  itemTapped($event, team) {
    this.navCtrl.push(TeamHomePage, team);
  }

}
