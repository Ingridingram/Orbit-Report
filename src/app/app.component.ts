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
  displayList: Satellite[] = [];
  searchInputValue: string = '';

  constructor() {}

  ngOnInit() {
    let satellitesUrl = 'https://handlers.education.launchcode.org/static/satellites.json';

    window.fetch(satellitesUrl).then((response) => {
      response.json().then((data) => {
        this.sourceList = data.satellites.map((s) => {
          return new Satellite(s.name, s.type, s.launchDate, s.orbitType, s.operational)
        });
        this.search('');
      });
    });
  }

  search(searchTerm: string): void {
    let matchingSatellites: Satellite[] = [];
    searchTerm = searchTerm.toLowerCase();
    for(let i=0; i < this.sourceList.length; i++) {
       let name = this.sourceList[i].name.toLowerCase();
       if (name.indexOf(searchTerm) >= 0) {
          matchingSatellites.push(this.sourceList[i]);
       }
    }
    // assign this.displayList to be the array of matching satellites
    // this will cause Angular to re-make the table, but now only containing matches
    this.displayList = matchingSatellites;
 }
}
