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

const listViewElements = {
  buttonWithText: (text: string) => cy.contains('button', text),
  paragraphWithText: (text: string) => cy.contains('p', text),
  characterListView: () => cy.get('.beagle-list-view').first(),
  categoriesListView: () => cy.get('.beagle-list-view').eq(1),
  categoryContainer: (category: string) => {
    const categories = listViewElements.categoriesListView()
    const categoryTitle = categories.contains('p', category)
    return categoryTitle.closest('beagle-container')
  },
  categoryBookContainer: (book: string) => {
    const categories = listViewElements.categoriesListView()
    const bookTitle = categories.contains('p', `Title: ${book}`)
    return bookTitle.closest('beagle-container')
  },
  nestedBooksListView: (category: string) => {
    const container = listViewElements.categoryContainer(category)
    return container.find('.beagle-list-view').first()
  },
  nestedCharactersListView: (book: string) => {
    const container = listViewElements.categoryBookContainer(book)
    return container.find('.beagle-list-view').first()
  },
  booksListView: () => cy.get('.beagle-list-view').last(),
  pageText: () => {
    const prevButton = listViewElements.buttonWithText('prev')
    const pageContainer = prevButton.closest('beagle-container')
    return pageContainer.find('p').first()
  },
  characterListStatus: () => (
    listViewElements.characterListView().closest('beagle-container').contains('p', 'status:')
  ),
  bookListViewTitle: () => cy.contains('p', 'Books List View (infinite scroll)'),
}

export default listViewElements
