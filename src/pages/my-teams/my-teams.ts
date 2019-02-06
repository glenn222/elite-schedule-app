import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { TournamentsPage } from '../tournaments/tournaments';
import { EliteScheduleApi } from '../../providers/elite-schedule-api/elite-schedule-api';
import { TeamHomePage } from '../team-home/team-home';

@Component({
  selector: 'page-my-teams',
  templateUrl: 'my-teams.html'
})
export class MyTeamsPage {

    favourites = [
        {
            team: { id: 6200, name: 'HC Elite 7th', coach: 'Michelotti' },
            tournamentId: '89e13aa2-ba6d-4f55-9cc2-61eba6172c63',
            tournamentName: 'March Madness Tournament'
        },
        {
            team: { id: 805, name: 'HC Elite', coach: 'Michelotti' },
            tournamentId: '98c6857e-b0d1-4295-b89e-2d95a45437f2',
            tournamentName: 'Holiday Hoops Challenge'
        }
    ];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public loadingController: LoadingController,
        public eliteScheduleApi: EliteScheduleApi
    ) {

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MyTeamsPage');
    }

    goToTournaments() {
        this.navCtrl.push(TournamentsPage);
    }

    favouriteTapped($event, favourite) {
        let loader = this.loadingController.create({
            content: 'Getting data...',
            dismissOnPageChange: true
        });
        loader.present();
        this.eliteScheduleApi.getTournamentData(favourite.tournamentId)
            .subscribe(t => this.navCtrl.push(TeamHomePage, favourite.team)
        );
    }
}  