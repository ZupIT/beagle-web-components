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

import tabBarElements from '../elements/tab-bar-elements'
import BeaglePage from './BeaglePage'

class TabBarPage extends BeaglePage {
  constructor() {
    super('tabbar')
  }

  ClickOnTab(tabText){
    tabBarElements.checkTab(tabText).click()
  }

  CheckPosition(value){
    tabBarElements.checkCurrentPosition(value).should('exist')
  }

  clickButton(text: string) {
    tabBarElements.buttonWithText(text).click()
  }

  // CheckIfTabIsSelected(tabText){
  //   tabBarElements.check(tabText).should('have.class', '.selected')
  // }

  CheckIfImagesExists(){
    tabBarElements.images().should('exist')
  }

  CheckImageByindex(){
    tabBarElements.imageByindex().should('exist')
  }

  CheckIfImagesWithText(tabText){
    tabBarElements.checkTab(tabText).should('exist')
  }


}

export default TabBarPage