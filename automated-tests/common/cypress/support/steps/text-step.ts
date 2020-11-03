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

Given("the Beagle application did launch with the texts on screen", () => {
    textPage.init()
})

Then(/my text component must render its respective (.*) correctly/, (textAttribute) => {
    textPage.checkTextOnScreen(textAttribute)
})

// Then(/my text component (.*) should render their respective color (.*) correctly/, () => {   
//     //textPage.checkText('hello world via expression')
// })

// Then(/my text component should render their respective (.*) with textAlignment at (.*) correctly/, () => {   
//     //textPage.checkTextColor('hello world via expression')
// })

