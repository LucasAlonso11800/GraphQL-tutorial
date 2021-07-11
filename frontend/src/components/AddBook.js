import React, { useState } from 'react'
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { getBooksQuery, getAuthorsQuery, addBookMutation } from '../queries/queries'

function AddBook({ getAuthorsQuery, addBookMutation }) {
    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [authorId, setAuthorId] = useState('60e8e0760fb3d12e882793b2');

    const handleSubmit = (e) => {
        e.preventDefault();
        addBookMutation({
            variables: {
                name,
                genre,
                authorId
            },
            refetchQueries: [{
                query: getBooksQuery
            }]
        })
    };

    return (
        <form className="add-book" onSubmit={handleSubmit}>
            <div className="field">
                <label>Book name:</label>
                <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    type="text"
                />
            </div>
            <div className="field">
                <label>Genre:</label>
                <input
                    value={genre}
                    onChange={e => setGenre(e.target.value)}
                    type="text"
                />
            </div>
            <div className="field">
                <label>Author:</label>
                <select
                    value={authorId}
                    onChange={e => setAuthorId(e.target.value)}
                    type="text"
                >
                    {getAuthorsQuery.authors?.map(author => {
                        return <option
                            key={author.id}
                            value={author.id}
                        >
                            {author.name}
                        </option>
                    })}
                </select>
            </div>
            <button type="submit">+</button>
        </form>
    )
};

export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);