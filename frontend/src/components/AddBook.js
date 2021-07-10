import React from 'react'
import { graphql } from 'react-apollo';
import { getAuthorsQuery } from '../queries/queries'

function AddBook({ data }) {
    return (
        <form className="add-book">
            <div className="field">
                <label>Book name:</label>
                <input type="text" />
            </div>
            <div className="field">
                <label>Genre:</label>
                <input type="text" />
            </div>
            <div className="field">
                <label>Author:</label>
                <select>
                    {data.authors?.map(author => {
                        return <option key={author.id}>{author.name}</option>
                    })}
                </select>
            </div>
            <button>+</button>
        </form>
    )
};

export default graphql(getAuthorsQuery)(AddBook);