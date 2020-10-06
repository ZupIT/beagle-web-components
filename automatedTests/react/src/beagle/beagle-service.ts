import { createBeagleUIService } from '@zup-it/beagle-react'

console.log(process.env)

export default createBeagleUIService({
  baseUrl: 'http://localhost:8080',
  components: {}
})