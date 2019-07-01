import React, { Component } from 'react'
import Book from "./Book";
import {Link} from "react-router-dom";
import * as BooksAPI from "../util/BooksAPI";
import { Debounce } from 'react-throttle';

class Search extends Component {

    state = {
        myBooks: [],
        searchBooks: []
    }

    search(query) {
        if (query.trim() !== '') {
            BooksAPI.search(query).then(books => {
                if (!books.error) {
                    // compare with local book collection
                    const myBooks = this.state.myBooks;
                    books.map(book => {
                        return myBooks.map(myBook => {
                            if (book.id === myBook.id)
                                book.shelf = myBook.shelf;
                            else if (!book.shelf)
                                book.shelf = "none";
                            return book;
                        });
                    });
                    this.setState({searchBooks: books});
                } else {
                    this.clearSearch();
                }
            });
        } else {
            this.clearSearch();
        }
    }

    clearSearch() {
        this.setState({ searchBooks: [] });
    }

    componentDidMount() {
        this.setState({ myBooks: this.props.bookCollection });
        document.getElementById('input-search').focus();
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <Debounce time="400" handler="onChange">
                            <input id="input-search" type="text" placeholder="Search by title or author"
                                   onChange={(event) => { this.search(event.target.value) }} />
                        </Debounce>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        { this.state.searchBooks.map((book) => (
                            <li key={ book.id }>
                                <Book
                                    data={ book }
                                    moveBookFunction={ this.props.moveBookFunction } />
                            </li>
                        )) }
                    </ol>
                    { this.state.searchBooks.length === 0 && (
                        <div id="no-results" style={{textAlign: 'center'}}>
                            <i>no results</i>
                        </div>
                    ) }
                </div>
            </div>
        )
    }

}

export default Search
