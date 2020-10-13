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

import imageElements from '../elements/image-elements'
import BeaglePage from './BeaglePage'

class ImagePage extends BeaglePage {
  constructor() {
    super('image')
  }

  checkNumberOfImages(quantity: number) {
    imageElements.images().should('have.length', quantity)
  }

  private checkImage(type: keyof typeof imageElements, expectedFit: string) {
    const img = imageElements[type]()
    img.should('exist')
    img.should('have.css', 'object-fit', expectedFit)
  }

  checkGenericImage() {
    this.checkImage('genericImage', 'cover')
  }

  checkFitXyImage() {
    this.checkImage('fitXyImage', 'fill')
  }

  checkFitCenterImage() {
    this.checkImage('fitCenterImage', 'cover')
  }

  checkCenterCropImage() {
    this.checkImage('centerCropImage', 'none')
  }

  checkCenterImage() {
    this.checkImage('centerImage', 'contain')
  }
}

export default ImagePage
