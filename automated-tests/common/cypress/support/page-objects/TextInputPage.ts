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

import textInputElements from '../elements/text-input-elements'
import BeaglePage from './BeaglePage'

class TextInputPage extends BeaglePage {
  constructor() {
    super('textinput')
  }

  checkValue(inputValue: string){
    textInputElements.valueOfInput(inputValue)
  }

  checkHintValue(hintValue: string){
    textInputElements.valueOfHint(hintValue)
  }

  checkHaveDisableInput(isDisable: string){
    textInputElements.valueOfHint(isDisable)
  }

  checkDisableInput(isDisable: string){
    textInputElements.valueOfHint(isDisable).should('be.disabled')
  }

  checkHaveReadOnlyInput(isReadOnly: string){
    textInputElements.valueOfInput(isReadOnly)
  }

  checkReadOnlyInput(isReadOnly: string){
    textInputElements.valueOfInput(isReadOnly).should('have.attr','readonly')
  }

  checkNumberInput(isInputNumber: string){
    textInputElements.valueOfHint(isInputNumber).should('have.attr','type', 'NUMBER') 
  }

  checkHidenInput(isHiden: string){
    textInputElements.valueOfInput(isHiden).should('not.be.visible')
  }
}

export default TextInputPage