import { BeagleModule } from '@zup-it/beagle-angular';
import { environment } from './../environments/environment';
import { AnalyticsConfig } from '@zup-it/beagle-web'
// import all the components you wish to use with Beagle.

const analyticsConfig: AnalyticsConfig = {
  enableScreenAnalytics: true,
  actions: {
    'beagle:alert': ['message']
  }
}

@BeagleModule({
  baseUrl: environment.baseUrl || 'http://localhost:4200/public',
  module: {
    path: './beagle-components.module',
    name: 'BeagleComponentsModule',
  },
  components: {
    // Associate every beagle component to your angular component.
  },
  analyticsProvider: {
    createRecord: (record) => {
      console.log('record', record)
    },
    getConfig: () => new Promise(resolve => {
      return resolve(analyticsConfig)
    }),
    startSession: () => new Promise(resolve => {
      return resolve()
    })
  }
  
})
export class Beagle {}
