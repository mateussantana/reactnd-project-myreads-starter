import React from 'react'
import * as BooksAPI from './util/BooksAPI'
import { Route, Link } from 'react-router-dom'
import './App.css'
import Shelf from "./components/Shelf";

class BooksApp extends React.Component {

  state = {
    books: [],
    shelves: {
      currentlyReading: {name: 'Currently Reading', books: []},
      wantToRead: {name: 'Want to Read', books: []},
      read: {name: 'Read', books: []}
    }
  }

  constructor() {
    super();
    this.moveToShelf = this.moveToShelf.bind(this)
  }

  moveToShelf(destinationShelf, book) {
    const originalShelf = book.shelf;
    let shelves = this.state.shelves;
    let books = this.state.books;

    // remove from the original shelf
    if (originalShelf !== 'none') {
      const newBookCollection = shelves[originalShelf].books.filter(_book => _book !== book);
      shelves[originalShelf].books = newBookCollection;
    } else {
      books.push(book);
    }

    // add to destination shelf
    if (destinationShelf !== 'none') {
      shelves[destinationShelf].books.push(book);
    } else {
      const newBooksCollection = books.filter(_book => _book !== book);
      books = newBooksCollection;
    }

    // update book shelf property
    book.shelf = destinationShelf;

    this.setState({
      'shelves': shelves,
      'books': books
    });
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      let shelves = this.state.shelves;
      books.forEach(book => {
        shelves[book.shelf].books.push(book);
      });
      this.setState({ books });
      this.setState({ shelves });
    });
  }

  render() {
    return (
      <div className="app">


        <Route exact path='/' render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  {
                    Object.keys(this.state.shelves).map(key => (
                        <Shelf
                            key={key}
                            data={this.state.shelves[key]}
                            moveBookFunction={this.moveToShelf} />
                    ))
                  }
                </div>
              </div>
              <div className="open-search">
                <Link className="button" to='/search'>Add a book</Link>
              </div>
            </div>
        )} />


        <Route path='/search' render={() => (
            <div className="search-books">
              <div className="search-books-bar">
                <Link className="close-search" to='/'>Close</Link>
                <div className="search-books-input-wrapper">
                  {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                  <input type="text" placeholder="Search by title or author"/>

                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid"></ol>
              </div>
            </div>
        )} />

      </div>
    )
  }
}

export default BooksApp
