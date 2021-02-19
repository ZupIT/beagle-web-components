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
When(/I click on a button that contains the title: (.*)/, (buttonTitle) => {
    cy.contains('button', buttonTitle).click()
})

When(/I click on a button that has exactly the title: (.*)/, (buttonTitle) => {
    cy.contains('button', buttonTitle).click()
})
