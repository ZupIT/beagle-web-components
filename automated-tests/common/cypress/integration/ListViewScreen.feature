#
# Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
    
@listview @regression
Feature: ListView Component Validation

  As a Beagle developer/user
  I'd like to make sure my listView component works as expected
  In order to guarantee that my application never fails

  Background:
    Given that I'm on the listView screen
    And the view port size is 480x720

  # First ListView: characters: horizontal with pagination and custom iteratorName

  Scenario: ListView 01 - Characters ListView
    Then should render the list of characters with exactly 34 items in the horizontal plane
    And the list of characters should be scrollable only horizontally
    # And button "prev" should be disabled
    # And button "next" should be enabled
    And the page number should be 1/2

  Scenario: ListView 02 - Characters ListView: going from page 1 to 2
    When I click the button "next"
    Then should render the list of characters with exactly 33 items in the horizontal plane
    # And button "prev" should be enabled
    # And button "next" should be disabled
    And the page number should be 2/2

  Scenario: ListView 03 - Characters ListView: going back from page 2 to 1
    Given that I'm on page 2 of the list of characters
    When I click the button "prev"
    Then should render the list of characters with exactly 34 items in the horizontal plane
    # And button "prev" should be disabled
    # And button "next" should be enabled
    And the page number should be 1/2

  Scenario: ListView 04 - Characters ListView: verify page 1 snapshots
    Then should match snapshot "characters-page1-0%" of the list of characters
    When When I scroll the list of characters to 25%
    Then should match snapshot "characters-page1-25%" of the list of characters
    When When I scroll the list of characters to 50%
    Then should match snapshot "characters-page1-50%" of the list of characters
    When When I scroll the list of characters to 75%
    Then should match snapshot "characters-page1-75%" of the list of characters
    When When I scroll the list of characters to 100%
    Then should match snapshot "characters-page1-100%" of the list of characters

  Scenario: ListView 05 - Characters ListView: verify page 2 snapshots
    Given that I'm on page 2 of the list of characters
    Then should match snapshot "characters-page2-0%" of the list of characters
    When When I scroll the list of characters to 25%
    Then should match snapshot "characters-page2-25%" of the list of characters
    When When I scroll the list of characters to 50%
    Then should match snapshot "characters-page2-50%" of the list of characters
    When When I scroll the list of characters to 75%
    Then should match snapshot "characters-page2-75%" of the list of characters
    When When I scroll the list of characters to 100%
    Then should match snapshot "characters-page2-100%" of the list of characters

  Scenario: ListView 06 - Characters ListView: read status
    Then the read status of the list of characters is unread
    When I scroll the list of characters to 100%
    Then the read status of the list of characters is read

  # Second ListView: categories: nested with three levels:
  # 1. Categories: vertical with fixed height.
  # 2. Books: books for each of the categories. Horizontal.
  # 3. Characters: characters for each book. Vertical, no-scroll.

  Scenario: ListView 08 - Categories ListView (nested): categories
    Then the list of categories should have height equal to 296
    And the list of categories should be scrollable only vertically
    And should render the list of categories with exactly 3 items in the vertical plane
    And every element in the list of categories should have a unique id or no id at all

  Scenario Outline: ListView 09 - Categories ListView (nested): categories and number of books
    Then should render "<category>" with a title and a listView
    And the parent container in category "<category>" should have id "category:<id>"
    And should render the list of books in "<category>" with exactly <numberOfBooks> items in the horizontal plane
    And the list of books in "<category>" should be scrollable only horizontally

    Examples:
      | category | numberOfBooks | id |
      | Fantasy  | 7             | 1  |
      | Sci-fi   | 5             | 2  |
      | Other    | 3             | 3  |

  Scenario Outline: ListView 10 - Categories ListView (nested): verify snapshots of every book list at different scroll percentages of the categories list
    When When I scroll the list of categories to <categoryListScrollPercentage>%
    Then should match snapshot "categories-<categoryListScrollPercentage>%-0%" of the list of categories
    When I scroll the list of books in "Fantasy" to 50%
    And I scroll the list of books in "Sci-fi" to 50%
    And I scroll the list of books in "Other" to 50%
    Then should match snapshot "categories-<categoryListScrollPercentage>%-50%" of the list of categories
    When I scroll the list of books in "Fantasy" to 100%
    And I scroll the list of books in "Sci-fi" to 100%
    And I scroll the list of books in "Other" to 100%
    Then should match snapshot "categories-<categoryListScrollPercentage>%-100%" of the list of categories

    Examples:
      | categoryListScrollPercentage |
      | 0                            |
      | 50                           |
      | 100                          |

  # Third ListView: books: vertical with infinite scroll and useParentScroll true

  Scenario: ListView 12 - Books ListView (infinite scroll)
    Then should render the list of books with exactly 5 items in the vertical plane
    And the list of books should not be scrollable
    And the initialization counter should be at 5
  
  Scenario: ListView 13 - Books ListView (infinite scroll): second set of books: scroll lower than 80% (threshold)
    When I scroll the view to 70%
    Then should not change the list of books (5 books)

  Scenario: ListView 14 - Books ListView (infinite scroll): second set of books: scroll greater than 80% (threshold)
    When I scroll the view to 90%
    Then should render the list of books with exactly 10 items in the vertical plane
    And the initialization counter should be at 10

  Scenario: ListView 15 - Books ListView (infinite scroll): second set of books: duplicated actions
    Given the next request to "/books?page=2" is slowed down by 3s
    When I scroll the view to 90%
    And I scroll the view to 70%
    And I scroll the view to 90%
    Then after 5 seconds, the list of books should have exactly 10 items

  Scenario: ListView 16 - Books ListView (infinite scroll): third set of books: scroll lower than 80% (threshold)
    Given that the second set of books in the list of books has been loaded
    When I scroll the view to 70%
    Then should not change the list of books (10 books)

  Scenario: ListView 17 - Books ListView (infinite scroll): third set of books: scroll greater than 80% (threshold)
    Given that the second set of books in the list of books has been loaded
    When I scroll the view to 100%
    Then should render the list of books with exactly 15 items in the vertical plane
    And the initialization counter should be at 15
    
  Scenario: ListView 18 - Books ListView (infinite scroll): no more data to load
    Given that the third set of books in the list of books has been loaded
    When I scroll the view to 100%
    Then should not change the list of books (15 books)

  Scenario: ListView 19 - Books ListView (infinite scroll): verify snapshot when the infinite scroll is fully loaded and rendered
    Given that the third set of books in the list of books has been loaded
    Then Then should match snapshot "books" of the list of books
