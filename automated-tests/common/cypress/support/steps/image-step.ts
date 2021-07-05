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

import ImagePage from '../page-objects/ImagePage'

const imagePage = new ImagePage

Given("that I'm on the image screen", () => {
  imagePage.init()
})

Then("image screen should render all image attributes correctly", () => {
  // even with imagePage.init(), it's necessary to ensure the page is loaded before taking screenshot
  cy.wait(2000)

  // @ts-ignore using untyped cypress extension
  cy.matchImageSnapshot("Image01", 0)
})
