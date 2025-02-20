import React, { PureComponent} from 'react'

class Book extends PureComponent {

    render() {
        let book = this.props.data;
        let moveFunction = this.props.moveBookFunction;

        const authors = book.authors ? book.authors.join(', ') : [];
        const imageLink = book.imageLinks ? book.imageLinks.smallThumbnail : '';

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${imageLink})`
                    }}></div>
                    <div className="book-shelf-changer">
                        <select value={book.shelf} onChange={ (element) => { moveFunction(element.target.value, book) }}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{ book.title }</div>
                <div className="book-authors">{ authors }</div>
            </div>
        )
    }

}

export default Book
