import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
// Components
import BookList from './components/BookList';
import AddBook from './components/AddBook';

const client = new ApolloClient({
    uri: "http://localhost:5000/graphql"
})

export default function App() {
    return (
        <ApolloProvider client={client}>
            <h1 className="title">My Reading List</h1>
            <BookList />
            <AddBook />
        </ApolloProvider>
    );
}