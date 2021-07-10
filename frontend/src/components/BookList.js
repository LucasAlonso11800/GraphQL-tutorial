import React from 'react'
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getBooksQuery = gql`
    {
        books {
            name
            id
        }
    }
`

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