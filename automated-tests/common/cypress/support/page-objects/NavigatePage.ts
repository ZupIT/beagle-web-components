/*
 * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import navigateElements from '../elements/Navigate-elements'
import BeaglePage from './BeaglePage'

class NavigatePage extends BeaglePage {
  constructor() {
    super('navigate-actions')
  }

  clickButton(text) {
    navigateElements.buttonWithText(text).click()
  }

  checkNavigate(text) {
    navigateElements.paragraphWithText(text).should('exist')
  }

  checkNoExist(text) {
    navigateElements.paragraphWithText(text).should('not.exist')
  }

  checkButton(text) {
    navigateElements.buttonWithText(text).should('exist')
  }
}

export default NavigatePage
