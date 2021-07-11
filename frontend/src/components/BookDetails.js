import React from 'react'
import { graphql } from 'react-apollo';
import { getSingleBookQuery } from '../queries/queries';

function BookDetails({ data }) {
    const { book } = data

    return (
        <div className="book-details">
            {book ?
                <>
                    <div>
                        <h2>{book.name}</h2>
                        <p className="book-data">Genre: {book.genre}</p>
                        <p className="book-data">Author: {book.author.name}</p>
                    </div>
                    <ul className="other-books">
                        <b>Other books from this author</b>
                        {book.author.books.map(book => {
                            return <li key={book.id}>{book.name}</li>
                        })}
                    </ul>
                </>
                :
                <p>No book selected</p>}
        </div>
    )
};

export default graphql(getSingleBookQuery, {
    options: props => {
        return {
            variables: {
                id: props.bookId
            }
        }
    }
})(BookDetails);