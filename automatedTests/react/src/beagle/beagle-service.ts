import { createBeagleUIService } from '@zup-it/beagle-react'

console.log(process.env)

export default createBeagleUIService({
  baseUrl: process.env.REACT_APP_BASE_URL || "",
  components: {}
})