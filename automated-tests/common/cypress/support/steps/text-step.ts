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

import TextPage from '../page-objects/TextPage'

const textPage = new TextPage

Given("that I'm on the text screen", () => {
    textPage.init()
})

Then("my text component must render its respective text attribute correctly", () => {
    textPage.checkText('hello world')
})

Then("my text component should render their respective text via expression correctly", () => {   
    textPage.checkText('hello world via expression')
})

Then("my text component should render their respective text with textColor correctly", () => {   
    textPage.checkTextColor('hello world via expression')
})

Then("my text component should render their respective text with textColor via expression correctly", () => {   
    textPage.checkTextColor('hello world via expression')
})

Then("my text component should render their respective text with textAlignment LEFT correctly", () => {   
    textPage.checkTextAlignmentLeft('hello world with textAlignment LEFT')
})

Then("my text component should render their respective text with textAlignment CENTER correctly", () => {   
    textPage.checkTextAlignmentCenter('hello world with textAlignment CENTER')
})

Then("my text component should render their respective text with textAlignment RIGHT correctly", () => {   
    textPage.checkTextAlignmentRight('hello world with textAlignment RIGHT')
})

//
Then("my text component should render their respective text with textAlignment LEFT via expression correctly", () => {   
    textPage.checkTextAlignmentLeft('hello world with textAlignment LEFT via expression')
})

Then("my text component should render their respective text with textAlignment CENTER via expression correctly", () => {   
    textPage.checkTextAlignmentCenter('hello world with textAlignment CENTER via expression')
})

Then("my text component should render their respective text with textAlignment RIGHT via expression correctly", () => {   
    textPage.checkTextAlignmentRight('hello world with textAlignment RIGHT via expression')
})