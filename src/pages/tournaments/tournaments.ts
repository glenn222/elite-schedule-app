import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { TeamsPage } from '../teams/teams';
import { EliteScheduleApi } from '../../providers/elite-schedule-api/elite-schedule-api';

/**
 * Generated class for the TournamentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html',
})
export class TournamentsPage {
  public tournaments: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private eliteScheduleApi: EliteScheduleApi,
    public loadingController: LoadingController) {
  }

  ionViewDidLoad() {
    let loader = this.loadingController.create({
      content: 'Getting tournaments...'
    });

    loader.present().then(() => {
      this.eliteScheduleApi.getTournaments()
      .subscribe(
        (data) => {
          this.tournaments = data;
          loader.dismiss();
        },
        (err) => {
          console.log("ERROR: " + err);
        });
    });
  }

  ionViewWillEnter() {
    console.log('## lifecycle ## ionViewWillEnter TournamentsPage');
  }

  ionViewWillLeave() {
    console.log('## lifecycle ## ionViewWillLeave TournamentsPage');
  }

  ionViewWillUnload() {
    console.log('## lifecycle ## ionViewWillUnload TournamentsPage');
  }

  itemTapped($event, tourney) {
    this.navCtrl.push(TeamsPage, tourney);
  }
}
