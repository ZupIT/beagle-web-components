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

/* TODO: 
 1- Place here all default and gerenic steps, implementing them with cy object
 2- Refactor all .features \ steps files to use the generic steps 
 3- Refactor all Page classes removing gerenic and repetitive methods used by the now removed steps. 
    Page classes are meant to hold only page scope methods and not generic methods like 'clickOnButtonWithTittle'  

*/

import { waitForDebugger } from 'inspector'
import elementsHelper from '../elements/ElementsHelper'

When(/I click on a button with text \"(.*)\"/, (text) => {
    elementsHelper.getElementByText('button', text).should('be.visible').click()
})

When(/I click on a button with exact text \"(.*)\"/, (text) => {
    elementsHelper.getElementByExactText('button', text).should('be.visible').click().then(($el) => {
        cy.task('log', 'Button request: "' + text + '" Button clicked: "' + $el.text() + '"')
    })
})

Then(/the page should show an element with text \"(.*)\"/, (text) => {
    elementsHelper.getAnyElementByText(text).should('be.visible')
})

Then(/the page should show an element with exact text \"(.*)\"/, (text) => {
    // @ts-ignore
    elementsHelper.getAnyElementByExactText(text).should('be.visible')
})

Then(/the page should not show an element with text \"(.*)\"/, (text) => {
    elementsHelper.getAnyElementByText(text).should('not.exist')
})

Then(/the page should not show an element with exact text \"(.*)\"/, (text) => {
    // @ts-ignore
    elementsHelper.getAnyElementByExactText(text).should('not.exist')
})
