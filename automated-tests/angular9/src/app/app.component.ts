import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import analyticsProvider from './analytics-provider'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'beagle-automated-tests-angular';
  analyticsJson = '[]'

  route: string;
  private queryParams = new URLSearchParams(window.location.search);

  constructor() {
    this.route = this.queryParams.get('path') || '';
    analyticsProvider.subscribe((analyticsRecords) => {
      //console.log(analyticsRecords)
      this.analyticsJson = JSON.stringify(analyticsRecords)
    })
  }
}
