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

import TextInputPage from '../page-objects/TextInputPage'

const textInputPage = new TextInputPage

Given("the Beagle application did launch with the textInput on screen", () => {
    textInputPage.init()
})

Then(/I must check if the textInput value (.*) appears on the screen/, (inputValue) => {
   textInputPage.checkValue(inputValue)
})

Then(/I must check if the textInput placeholder (.*) appears on the screen/, (hintValue) => {
    textInputPage.checkHintValue(hintValue)
})

When(/the placeholder (.*) of the disabled field is on the screen/, (isDisable) => {
    textInputPage.checkHaveDisableInput(isDisable)
})

Then(/verify if the field with the placeholder (.*) is disabled/, (isDisable) => {
    textInputPage.checkDisableInput(isDisable)
})

When(/the value (.*) of the readOnly field is on the screen/, (isReadOnly) => {
    textInputPage.checkHaveReadOnlyInput(isReadOnly)
})

Then(/verify if the field with the value (.*) is read only/, (isReadOnly) => {
    textInputPage.checkReadOnlyInput(isReadOnly)
})

Then(/validate textInput component of type number with text (.*)/, (isInputNumber) => {
    textInputPage.checkNumberInput(isInputNumber)  
})

When(/I click to textInput with the placeholder (.*) then change to (.*) and to (.*)/, (hint, didOnFocus, didOnChange) => {
    textInputPage.checkEvents(hint, didOnFocus, didOnChange)
})

Then(/the text (.*) should be appear/, (didOnblur) => {
    textInputPage.checkOnblur(didOnblur)  
})

Then(/The hidden input fields (.*) should not be visible/, (isHiden) => {
    textInputPage.checkHidenInput(isHiden)
})