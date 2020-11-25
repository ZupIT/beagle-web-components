# E2E tests
Now that we have implemented the ListView, before releasing it, we must create its end-to-end tests using Cucumber.

## The application
The application we chose to test the feature is a page with 3 list views. All lists are based in a [small database of books](https://gist.github.com/Tiagoperes/e1e677e158433f7c5a6bf4ebf7947c5d) and their data sources will be retrieved from services in the BFF.

This is the page we are going to test:
![Page illustration](https://i.ibb.co/yN1vjrL/list-view-test.png)

### The first ListView (characters, pagination)
The first list view is a list view placed in the horizontal that uses a custom `iteratorName`. This is a simple list that, when initialized, loads the first page of the set of characters. The template shows the character name and the book and collection it comes from. This list should occupy all the width available and the height its content needs.

This list is also paginated and should be controlled by the buttons (prev/next) above it. The data source must be loaded via the backend service at `$bffUrl/book-database/characters?page=$page`. Moreover, since its a pagination and not an infinite scroll, the data source should be replaced when the page changes.

This list also has another feature, when it's scrolled to 100%, the text below it will alter from "status: unread" to "status:read". This is done so we can test the `onScrollEnd` event on a horizontal list. The threshold here must not be specified, i.e. it should use the default (100%).

### The second ListView (categories, nested)
This is actually 3 nested list-views. Its objective is to show every character for every book in every category. There's an onInit event for the top-most ListView (categories) and the middle ListView (books) that loads the data sources from the BFF.

The top-most list iterates over the list of categories. It is a vertical list with fixed height (307) and automatic width (occupies all the space available). Its data source comes from `$bffUrl/book-database/categories`.

The list in the middle iterates over the books of the current category. It is a horizontal list. It occupies all the width available and its height fits its content. The data source for this list comes from `$bffUrl/book-database/category/$categoryId`.

The deepest list iterates over the characters of the current book. It is a vertical list with no scroll that occupies as much space as its content needs. The data source for this list doesn't need to be loaded, the characters from a book comes in the field `characters` of the request made in the parent ListView (books).

In this ListView example it is very important to set the keys in the ListViews. We'll check the id assigning behavior in our tests:
- The top ListView must have the key `id`;
- the middle ListView must have the key `title`;
- the deepest ListView must not have a key.

It is also important to set some ids in the templates:
- The parent container in the top ListView must have the id `category`;
- The parent container in the middle ListView must have the id `book`;
- The text in the deepest ListView must have the id `character`.

### The third ListView (books, infinite scroll)
This list iterates over all books in the database. It is a vertical list that increases the height of the entire screen, i.e. it uses the scroll of the page instead of creating its own (`useParentScroll` is `true`).

This is an infinite scroll, i.e. it loads its content in the event `onScrollEnd`. The scroll threshold used for this list is 80%. To load the data source, a request should be made to `bffUrl/book-database/books?page=$page`. Moreover, since its an infinite scroll and not a pagination, the data source should be incremented when the page changes, never replaced.

### The book analytics
To be able to test the **onInit in a template** properly, we are going to create a custom action called `custom:bookAnalytics`. This action always receives a `source` and another property(ies) to identify the item loaded.

The idea here is that the developer wants to know which items are being viewed by the user. Every time an item is initialized, it will call the action `custom:bookAnalytics`.

- Every character in the first list view (characters) will call `custom:bookAnalytics` with `{ source: 'characters-list', character: characterName }`.
- Every category in the second list view (categories) will call `custom:bookAnalytics` with `{ source: 'categories-list', category: categoryName }`.
- Every book in the second list view (categories:books) will call `custom:bookAnalytics` with `{ source: 'categories-books-list', book: bookTitle }`.
- Every character in the second list view (categories:books:characters) will call `custom:bookAnalytics` with `{ source: 'categories-books-characters-list', character: characterName }`.
- Every book in the third list view (books) will call `custom:bookAnalytics` with `{ source: 'books-list', book: bookTitle }`.

In our tests this custom action can be just a mock we can observe when called.

## BFF services
The following end-points should be created in the BFF:

- `/book-database/characters?page=$page`: should bring every character with the properties `name`, `book` and `collection`. This result should be paginated, i.e. it should respect the structure `currentPage, totalPages, result`, where result is where the list of characters actually goes. There must be two pages only, the first with the first 34 characters and the second with the remaining 33.
- `/book-database/categories`: should bring every category/genre with its `id` and `name`.
- `/book-database/categories/$category`: should bring every book in the category/genre with id `$category`. Each book must have the properties `title`, `author` and `characters`.
- `/book-database/books?page=$page`: should bring every book with the properties `title`, `author`, `collection`, `bookNumber`, `genre` and `rating`. This result should be paginated, i.e. it should respect the structure `currentPage, totalPages, result`, where result is where the list of books actually goes. There must be 3 pages, each one with 15 books.

All these services must be based on [this json](https://gist.github.com/Tiagoperes/e1e677e158433f7c5a6bf4ebf7947c5d)

## Tests 
Because of all the scrolling involved in these tests, it is very important that we all use the same view port size when running the tests. The image used in the first section represents a view port size 480 x 720 (width x height).

### Tests for the first ListView (characters, pagination)

1. Check the rendering of the first page and the page indicator.
2. Test the process of going to page 2 from page 1.
3. Test the process of going to page 1 from page 2.
4. Check the rendering and the analytics of each character in page 1.
5. Check the rendering and the analytics of each character in page 2.
6. Check the behavior for the "read status" feature.
7. Check if the analytics action has not been called more times than it should have.

### Tests for the second ListView (categories, nested)

8. Check the rendering and the analytics of the list of categories.
9. Check the rendering and the analytics of each category and its list of books.
10. Check the rendering and the analytics of each book and its list of characters.
11. Check if the analytics action has not been called more times than it should have.

### Tests for the third ListView (books, infinite scroll)

12. Check the rendering and the analytics of the first pack of books.
13. Check if nothing happens by scrolling the view to a value under the threshold.
14. Check the rendering and the analytics of the second pack of books by scrolling the view to a value over the threshold.
15. Check if the action to add more books to the list is not called more than once when scrolling multiple times over the threshold before the request finishes.
16. Given the second pack is loaded already, check if nothing happens by scrolling the view to a value under the threshold.
17. Given the second pack is loaded already, check the rendering and the analytics of the third pack of books by scrolling the view to a value over the threshold.
18. Given all the data has loaded already, check if nothing happens by scrolling the view to a value over the threshold.
19. Given all the data has loaded already, check if every book has been correctly rendered and its analytics have been called.

**The `.feature` for all these test can be found [here]().**
