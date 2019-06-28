import React, { Component } from 'react'
import Book from "./Book";
import {Link} from "react-router-dom";
import * as BooksAPI from "../util/BooksAPI";

class Search extends Component {

    state = {
        myBooks: [],
        searchBooks: []
    }

    search(query) {
        if (query.trim() !== '') {
            BooksAPI.search(query).then(books => {
                if (!books.error) {
                    this.setState({searchBooks: books});
                    document.getElementById('no-results').style.display = 'none';
                } else {
                    this.setState({searchBooks: []});
                    document.getElementById('no-results').style.display = 'block';
                }
            });
        } else {
            this.setState({ searchBooks: [] });
            document.getElementById('no-results').style.display = 'block';
        }
    }

    componentDidMount() {
        this.setState({ 'myBooks': this.props.bookCollection });
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" onChange={(event) => { this.search(event.target.value) }} />
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
                    <div id="no-results" style={{textAlign: 'center'}}>
                        <i>no results</i>
                    </div>
                </div>
            </div>
        )
    }

}

export default Search
