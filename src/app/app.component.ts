import { Component, OnInit } from '@angular/core';
import { Satellite } from './satellite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Orbit-Report';

  sourceList: Satellite[] = [];

  constructor() {}

  ngOnInit() {
    let satellitesUrl = 'https://handlers.education.launchcode.org/static/satellites.json';

    window.fetch(satellitesUrl).then((response) => {
      response.json().then((data) => {
        this.sourceList = data.satellites.map((s) => {
          return new Satellite(s.name, s.type, s.launchDate, s.orbitType, s.operational)
        });
      });
    });
  }
}
