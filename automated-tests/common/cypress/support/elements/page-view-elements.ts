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

const buttonElements = {
  indicatorBullets: () => cy.get('.page-indicator li'),
  indicatorBullet: (index: number) => cy.get('.page-indicator li').eq(index),
  leftArrow: () => cy.get('.left-arrow'),
  rightArrow: () => cy.get('.right-arrow'),
  pageContent: () => cy.get('.page-item.active'),
}

export default buttonElements