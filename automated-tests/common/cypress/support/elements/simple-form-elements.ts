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

import { eq } from "cypress/types/lodash"

const simpleFormElements = {
    inputs: () => cy.get('input'),
    button: () => cy.get('button'),
    inputHint:(hint: string) => cy.get(`input[placeholder=${hint}]`),
    verifyAlert:() => cy.on('window:alert', (str) => {
        cy.get('button').click()
        if(expect(str).to.equal(`The form was successfully!`)){ cy.get('button').click() }
    }) 
}

export default simpleFormElements
