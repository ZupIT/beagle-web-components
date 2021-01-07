import { Component } from '@angular/core';
import StorageService from './storage.service'

@Component({
  selector: 'screen-analytics-link',
  templateUrl: './screen-analytics-link.component.html'
})
export class ScreenAnalyticsLinkComponent {
  title = 'beagle-automated-tests-angular';
  analyticsJson = '[]'

  constructor() {
    this.analyticsJson = JSON.stringify(StorageService.getData('Analytics_data'))
  }
}
