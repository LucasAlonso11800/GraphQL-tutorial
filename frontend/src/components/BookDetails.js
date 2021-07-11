import React from 'react'
import { graphql } from 'react-apollo';
import { getSingleBookQuery } from '../queries/queries';

function BookDetails({ data }) {
    const { book } = data 

    return (
        <div className="book-details">
            {book ?
                <div>
                    <h2>{book.name}</h2>
                    <p className="book-data">{book.genre}</p>
                    <p className="book-data">{book.author.name}</p>
                    <p className="book-data">Other books from this author</p>
                    <ul className="other-books">
                        {book.author.books.map(book => {
                            return <li key={book.id}>{book.name}</li>
                        })}
                    </ul>
                </div> :
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