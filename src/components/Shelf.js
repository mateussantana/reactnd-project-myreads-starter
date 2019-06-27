import React, { Component } from 'react'
import Book from "./Book";

class Shelf extends Component {

    render() {
        let shelf = this.props.data;

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{ shelf.name }</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        { shelf.books.map( book => (
                            <li key={ book.id }>
                                <Book data={ book } />
                            </li>
                        )) }
                    </ol>
                </div>
            </div>
        )
    }

}

export default Shelf
