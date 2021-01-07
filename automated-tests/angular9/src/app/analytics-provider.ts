import { AnalyticsConfig, AnalyticsProvider, AnalyticsRecord } from '@zup-it/beagle-web'
import StorageService from './storage.service'

const analyticsStorageKey = 'Analytics_data';
let analyticsRecords: AnalyticsRecord[]

const analyticsConfig: AnalyticsConfig = {
  enableScreenAnalytics: true,
  actions: {
    'beagle:confirm': ['message']
  }
}

const analyticsProvider: AnalyticsProvider = {
  createRecord: (record) => {
    analyticsRecords.push(record)
    StorageService.setData(analyticsStorageKey, analyticsRecords)
  },
  getConfig: () => Promise.resolve(analyticsConfig),
  startSession: async () => {
    analyticsRecords = StorageService.getData(analyticsStorageKey) || [];
    console.log('startSession', analyticsRecords)
  }
}

export default analyticsProvider