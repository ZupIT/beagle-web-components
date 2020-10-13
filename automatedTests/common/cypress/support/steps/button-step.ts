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

import ButtonPage from '../pageobjects/ButtonPage'

const buttonPage = new ButtonPage

Given("that I'm on the button screen", () => {
  buttonPage.init()
})

When(/I click on button (.*)/, (buttonText) => {
  buttonPage.clickButton(buttonText)
})

Then("all my button components should render their respective text attributes correctly", () => {
  buttonPage.checkNumberOfButtons(4)
  buttonPage.checkButton('Button')
  buttonPage.checkButton('Button with style')
  buttonPage.checkButton('Button with Appearance')
  buttonPage.checkButton('Button with Appearance and style')
})

Then('component should render the action attribute correctly', () => {
  buttonPage.checkButtonAction()
})
