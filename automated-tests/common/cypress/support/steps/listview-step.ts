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

import ListViewPage from '../page-objects/listViewPage'
import { uniq } from 'lodash'

const listViewPage = new ListViewPage

/*********
 * GIVEN *
 *********/

Given('that I\'m on the listView screen', () => {
  listViewPage.init()
})

Given(/^the view port size is (\d+)x(\d+)$/, (width: string, height: string) => {
  cy.viewport(parseInt(width), parseInt(height))
})

Given('that I\'m on page 2 of the list of characters', () => {
  listViewPage.clickButtonWithText('next')
  listViewPage.expectPageNumberToBe('2')
})

Given(/the next request to "([^"])+" is slowed down by (\d+)s/, (path: string, delay: string) => {
  let isNext = true

  cy.intercept(new RegExp(`${path}$`), (req) => {
    req.reply(async () => {
      if (isNext) {
        isNext = false
        await new Promise(r => setInterval(r, parseInt(delay) * 1000))
      }
    })
  })
})

Given('that the second set of books in the list of books has been loaded', () => {
  listViewPage.scrollViewTo(90)
  cy.wait(1000)
})

Given('that the third set of books in the list of books has been loaded', () => {
  listViewPage.scrollViewTo(90)
  cy.wait(1000)
  listViewPage.scrollViewTo(90)
  cy.wait(1000)
})

/********
 * WHEN *
 ********/

When(/I click the button "([^"])+"/, (btnText) => {
  listViewPage.clickButtonWithText(btnText)
})

When(/I scroll the list of (.*) to (\d+)%/, (listName: string, scrollPercentage: string) => {
  listViewPage.scrollListTo(listName, parseInt(scrollPercentage))
})

When(/I scroll the view to (\d+)%/, (percentage: string) => {
  listViewPage.scrollViewTo(parseInt(percentage))
})

/********
 * THEN *
 ********/

Then(
  /should render the list of (.*) with exactly (\d+) items in the (horizontal|vertical) plane/,
  (listName: string, expectedNumberOfItems: string, expectedAxis: 'horizontal' | 'vertical') => {
    listViewPage.expectListToContainNumberOfItems(listName, parseInt(expectedNumberOfItems))
    listViewPage.expectListAxisToBe(listName, expectedAxis)
  },
)

Then(
  /the list of (.*) should be (horizontal|vertical)/,
  (listName: string, expectedAxis: 'horizontal' | 'vertical') => {
    listViewPage.expectListAxisToBe(listName, expectedAxis)
  },
)

Then(
  /the list of (.*) should be scrollable only (horizontally|vertically)/,
  (listName: string, axis: 'horizontally' | 'vertically') => {
    if (axis === 'horizontally') {
      listViewPage.expectListToBeScrollable(listName, 'horizontal')
      listViewPage.expectListToNotBeScrollable(listName, 'vertical')
    } else {
      listViewPage.expectListToBeScrollable(listName, 'vertical')
      listViewPage.expectListToNotBeScrollable(listName, 'horizontal')
    }
  },
)

Then(
  /the list of (.*) should not be scrollable/,
  (listName: string) => {
    listViewPage.expectListToNotBeScrollable(listName, 'horizontal')
    listViewPage.expectListToNotBeScrollable(listName, 'vertical')
  },
)

Then(/the page number should be (\d+\/\d+)/, (pageNumber: string) => {
  listViewPage.expectPageNumberToBe(pageNumber)
})

Then(/the read status of the list of characters is (unread|read)/, (status: 'read' | 'unread') => {
  listViewPage.expectCharacterListStatusToBe(status)
})

Then(
  /the list of (.*) should have height equal to (\d+)/,
  (listName: string, size: string) => {
    listViewPage.expectListHeightToBe(listName, parseInt(size))
  },
)

Then(
  /every element in the list of (.*) should have a unique id or no id at all/,
  (listName: string) => {
    listViewPage.expectIdsInListToBeUnique(listName)
  },
)

Then(/should render "([^"]+)" with a title and a listView/, (category: string) => {
  listViewPage.expectCategoryToBeFullyRendered(category)
})

Then(
  /the parent container in category "([^"]+)" should have id "([^"]+)"/,
  (category: string, id: string) => {
    listViewPage.expectRootIdInCategoryToBe(category, id)
  },
)

Then(
  /the parent container of the book "([^"]+)", in "([^"]+)", should have id "([^"]+)"/,
  (title: string, category: string, id: string) => {
    listViewPage.expectRootIdInCategoryBookToBe(title, id)
  },
)

Then(/should not change the list of books \((\d+) books\)/, (numberOfBooks: string) => {
  cy.wait(1000)
  listViewPage.expectListToContainNumberOfItems('books', parseInt(numberOfBooks))
})

Then(
  /after (\d+) seconds, the list of books should have exactly (\d+) items/,
  (timeToWait: string, numberOfBooks: string) => {
    cy.wait(parseInt(timeToWait) * 1000)
    listViewPage.expectListToContainNumberOfItems('books', parseInt(numberOfBooks))
  },
)

Then(/the initialization counter should be at (\d+)/, (expectedCounterValue) => {
  listViewPage.expectInitializationCounterToBe(expectedCounterValue)
})

Then(
  /should match snapshot "([^"]+)" of the list of (.*)$/,
  (snapshotName: string, listName: string) => {
    listViewPage.expectListToMatchSnapshot(listName, snapshotName)
  },
)
