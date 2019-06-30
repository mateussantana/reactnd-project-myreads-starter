import React from 'react'
import * as BooksAPI from './util/BooksAPI'
import { Route, Link } from 'react-router-dom'
import './App.css'
import Shelf from "./components/Shelf";
import Search from "./components/Search";

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
      const newBookCollection = shelves[originalShelf].books.filter(_book => _book.id !== book.id);
      shelves[originalShelf].books = newBookCollection;
    } else {
      books.push(book);
    }

    // add to destination shelf
    if (destinationShelf !== 'none') {
      shelves[destinationShelf].books.push(book);
    } else {
      const newBooksCollection = books.filter(_book => _book.id !== book.id);
      books = newBooksCollection;
    }

    // update book shelf property
    book.shelf = destinationShelf;
    BooksAPI.update(book, destinationShelf);

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
            <Search
                bookCollection={ this.state.books }
                moveBookFunction={ this.moveToShelf } />
        )} />

      </div>
    )
  }
}

export default BooksApp
