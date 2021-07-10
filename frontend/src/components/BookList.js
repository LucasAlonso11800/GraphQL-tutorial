import React from 'react'
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';

function BookList({ data }) {
    return (
        <div>
            <ul className="book-list">
                {data.loading ? <h3>Loading books...</h3> :
                    data.books.map(book => {
                        return <li key={book.id}>{book.name}</li>
                    })}
            </ul>
        </div>
    )
};

export default graphql(getBooksQuery)(BookList);