import React, { useState } from 'react'
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';

function BookList({ data }) {
    const [selected, setSelected] = useState('');

    return (
        <div>
            <ul className="book-list">
                {data.loading ? <h3>Loading books...</h3> :
                    data.books.map(book => {
                        return <li
                            key={book.id}
                            onClick={() => setSelected(book.id)}
                        >
                            {book.name}
                        </li>
                    })}
            </ul>
            <BookDetails bookId={selected} />
        </div>
    )
};

export default graphql(getBooksQuery)(BookList);