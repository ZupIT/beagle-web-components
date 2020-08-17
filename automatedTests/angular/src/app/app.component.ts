import { Component } from '@angular/core';
import { LoadParams } from '@zup-it/beagle-web';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'beagle-automated-tests-angular';

  loadParams: LoadParams;
  queryParams = new URLSearchParams(window.location.search);

  constructor() {
    this.loadParams = {
      path: this.queryParams.get('path') || '/payload.json'
    };
  }
}
