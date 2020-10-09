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

import ButtonPage from '../page-objects/ImagePage'

const buttonPage = new ButtonPage

Given("that I'm on the image screen", () => {
  buttonPage.init()
})

Then("image screen should render all image attributes correctly", () => {
  buttonPage.checkNumberOfImages(5)
  buttonPage.checkCenterCropImage()
  buttonPage.checkCenterImage()
  buttonPage.checkFitCenterImage()
  buttonPage.checkFitXyImage()
  buttonPage.checkGenericImage()
})
