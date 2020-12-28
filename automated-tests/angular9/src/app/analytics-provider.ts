import { AnalyticsConfig, AnalyticsRecord } from '@zup-it/beagle-web'
type Listener = (records:AnalyticsRecord[]) => void

const analyticsRecords:AnalyticsRecord[] = []
let analyticsListener:Listener = () => {}

const analyticsConfig: AnalyticsConfig = {
    enableScreenAnalytics: true,
    actions: {
      'beagle:confirm': ['message']
    }
  }

const analyticsProvider = {
    subscribe:(listener:Listener ) => {
        analyticsListener = listener
    },
    createRecord: (record) => {
        console.log(record)
        //console.log('create record', analyticsListener)
        analyticsRecords.push(record)
        analyticsListener(analyticsRecords)
        
    },
    getConfig: () => Promise.resolve(analyticsConfig),
    startSession: () => Promise.resolve()
}

export default analyticsProvider