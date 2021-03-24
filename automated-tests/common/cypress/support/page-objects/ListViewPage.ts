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

import { find, includes, uniq } from 'lodash'
import listViewElements from '../elements/listview-elements'
import BeaglePage from './BeaglePage'

type Axis = 'horizontal' | 'vertical'

interface ListNameHandler {
  pattern: RegExp,
  getter: (match: null | string[]) => Cypress.Chainable<JQuery<HTMLElement>>,
}

class ListViewPage extends BeaglePage {
  constructor() {
    super('listview')
  }

  init() {
    return super.init().then(() => {
      // give it a time to guarantee everything has been rendered
      cy.wait(2000)
    })
  }

  private getListByName(listName: string) {
    const handlers: ListNameHandler[] = [
      {
        pattern: /^characters$/,
        getter: () => listViewElements.characterListView(),
      },
      {
        pattern: /^categories$/,
        getter: () => listViewElements.categoriesListView(),
      },
      {
        pattern: /^books in "([^"]+)"$/,
        getter: ([_, category]) => listViewElements.nestedBooksListView(category),
      },
      {
        pattern: /^characters in "([^"]+)"$/,
        getter: ([_, title]) => listViewElements.nestedCharactersListView(title),
      },
      {
        pattern: /^books$/,
        getter: () => listViewElements.booksListView(),
      },
    ]
  
    const handler = find(handlers, handler => listName.match(handler.pattern)) as ListNameHandler
    if (!handler) throw new Error(`Invalid list name: ${listName}`)
    return handler.getter(listName.match(handler.pattern))
  }

  clickButtonWithText(btnText: string) {
    listViewElements.buttonWithText(btnText).click()
  }

  scrollListTo(listName: string, scrollPercentage: number) {
    const list = this.getListByName(listName).then((element) => {
      const scrollTo = element[0].classList.contains('HORIZONTAL')
        ? { x: `${scrollPercentage}%`, y: '0%' }
        : { x: '0%', y: `${scrollPercentage}%` }

      // executes the scroll on the parent (<beagle-list-view>)
      list.parent().scrollTo(scrollTo.x, scrollTo.y)
    })
  }

  scrollViewTo(percentage: number) {
    // slow down the scrolling a little bit so we can actually see it happening
    cy.wait(500)
    cy.scrollTo('0%', `${percentage}%`)
  }

  expectListToContainNumberOfItems(listName: string, expectedNumberOfItems: number) {
    const list = this.getListByName(listName)
    list.should('exist')
    list.children().should('have.length', expectedNumberOfItems)
  }

  expectListAxisToBe(listName: string, value: Axis) {
    const list = this.getListByName(listName)
    const expectedFlexDirection = value === 'horizontal' ? 'row' : 'column'
    list.should('have.css', { 'flex-direction': expectedFlexDirection })
  }

  private expectListScrollabilityToBe(listName: string, axis: Axis, value: boolean) {
    this.getListByName(listName).then((element) => {
      const htmlElement = element[0]

      // get the tag <beagle-list-view>
      const beagleListViewTag = htmlElement.parentElement

      // calculate if the scroll is visible according to the css
      const css = window.getComputedStyle(beagleListViewTag)
      const scrollableOverflow = ['auto', 'overlay', 'scroll']
      const overflowAxis = axis === 'horizontal' ? css.overflowX : css.overflowY
      const isScrollVisible = includes(scrollableOverflow, overflowAxis)

      // calculate if the content overflows
      const isOverflowing = axis === 'horizontal'
        ? beagleListViewTag.scrollWidth > beagleListViewTag.clientWidth
        : beagleListViewTag.scrollHeight > beagleListViewTag.clientHeight

      // content is visible if it overflows and if the scroll is visible
      const isScrollable = isScrollVisible && isOverflowing  
      if (value) expect(isScrollable).to.be.true
      else expect(isScrollable).to.be.false
    })
  }

  expectListToBeScrollable(listName: string, axis: Axis) {
    this.expectListScrollabilityToBe(listName, axis, true)
  }

  expectListToNotBeScrollable(listName: string, axis: Axis) {
    this.expectListScrollabilityToBe(listName, axis, false)
  }
  
  expectPageNumberToBe(pageNumber: string) {
    listViewElements.pageText().should('contain.text', pageNumber)
  }

  expectCharacterListStatusToBe(status: 'read' | 'unread') {
    listViewElements.characterListStatus().should('contain.text', `status: ${status}`)
  }

  expectListHeightToBe(listName: string, height: number) {
    // parent because it's the tag <beagle-list-view> that holds list height
    this.getListByName(listName).parent().should('have.css', 'height', `${height}px`)
  }

  expectIdsInListToBeUnique(listName: string) {
    this.getListByName(listName).then((element) => {
      const ids = []
      const htmlElement = element[0]
      const beagleElements = htmlElement.querySelectorAll('[data-beagle-id]')
      beagleElements.forEach(e => ids.push(e.getAttribute('data-beagle-id')))
      const nonEmptyIds = ids.filter(id => !!id)
      const uniqueIds = uniq(nonEmptyIds)
      expect(uniqueIds.length).to.equal(nonEmptyIds.length)
    })
  }

  expectCategoryToBeFullyRendered(category: string) {
    const container = listViewElements.categoryContainer(category)
    container.should('exist')
    container.contains('p', category).should('exist')
    listViewElements.categoryContainer(category).find('.beagle-list-view').should('exist')
  }

  expectRootIdInCategoryToBe(category: string, expectedId: string) {
    const container = listViewElements.categoryContainer(category)
    container.should('have.attr', 'data-beagle-id', expectedId)
  }

  expectRootIdInCategoryBookToBe(book: string, expectedId: string) {
    const container = listViewElements.categoryBookContainer(book)
    container.should('have.attr', 'data-beagle-id', expectedId)
  }

  expectInitializationCounterToBe(expectedCounterValue: number) {
    listViewElements.bookListViewTitle().should(
      'contain',
      `${expectedCounterValue} items initialized`,
    )
  }

  expectListToMatchSnapshot(listName: string, snapshotName: string) {
    /* Since the images will be slightly different in different environments, we only make snapshot
    tests for the headless browser. These differences could be ignored with AI image comparison,
    but we use a pixel-by-pixel tool. AI tools are paid. */
    if (!Cypress.browser.isHeadless) return
    // @ts-ignore using untyped cypress extension
    this.getListByName(listName).parent().matchImageSnapshot(snapshotName, 0)
  }
}

export default ListViewPage
