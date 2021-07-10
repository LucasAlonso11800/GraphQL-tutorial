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
            <BookList />
            <AddBook />
        </ApolloProvider>
    );
}