import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/*
  Generated class for the EliteScheduleApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
/* The Elite Schedule Api communicates with HTTP servers to get JSON elite schedule data */
@Injectable()
export class EliteScheduleApi {
  private baseUrl: any = "https://elite-schedule-app-i2-abf11.firebaseio.com";
  private currentTourney: any = {};
  
  constructor(private http: HttpClient) {
  }

  getTournaments() {
    return this.http.get<Tournament[]>(this.baseUrl + '/tournaments.json');
  }

  getTournamentData(tourneyId) : Observable<any> {
    return this.http.get(this.baseUrl + '/tournaments-data/' + tourneyId + '.json')
      .map(response => {
        this.currentTourney = response;
        return this.currentTourney;
      })
  }

  getCurrentTourney() {
    return this.currentTourney;
  }
}

export interface Tournament {
  id: string
  name: string
}