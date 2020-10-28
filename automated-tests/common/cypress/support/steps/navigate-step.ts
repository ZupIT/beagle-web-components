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

import NavigatePage from '../page-objects/NavigatePage'

const navigatepage = new NavigatePage

Given("the Beagle application did launch with the navigation screen url", () => {
    navigatepage.init()
})

When(/I press a navigation button (.*)/, (buttonText) => {
  navigatepage.clickButton(buttonText)
})

When(/I press a navigation failure button (.*)/, (buttonText) => {
  navigatepage.clickButton(buttonText)
})

And (/I click on (.*) button/, (pop) => {
  navigatepage.clickButton(pop)
})

Then(/the screen should navigate to another screen with the text label (.*)/, (text) => {
  navigatepage.checkNavigate(text)
})

Then(/the screen should not navigate to another screen with the text label (.*)/, (text) => {
  navigatepage.checkNoExist(text)
})

Then(/the app should dismiss the view that contains (.*)/, (text) => {
  navigatepage.checkNoExist(text)
})

Then(/the view that contains the (.*) must still exist/, (title) => {
  navigatepage.checkButton(title)
})

Then(/There must be a text with an error (.*)/, (text) => {
  navigatepage.checkNavigate(text)
})

Then(/the view that contains the (.*) must still exist/, (text) => {
  navigatepage.checkNavigate(text)
})

Then(/the view that contains (.*) must still exist/, (text) => {
  navigatepage.checkNavigate(text)
})


  