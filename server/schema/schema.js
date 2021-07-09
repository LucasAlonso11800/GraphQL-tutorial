const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID
} = graphql;

// dummy data
const books = [
    { name: 'A Game of Thrones', genre: 'Fantasy', id: '1' },
    { name: 'A Clash of Kings', genre: 'Fantasy', id: '2' },
    { name: 'A Storm of Swords', genre: 'Fantasy', id: '3' },
    { name: 'A Feast for Crows', genre: 'Fantasy', id: '4' },
    { name: 'A Dance with Dragons', genre: 'Fantasy', id: '5' },
    { name: 'The Winds of Winter', genre: 'Fantasy', id: '6' },
    { name: 'A Dream of Spring', genre: 'Fantasy', id: '7' }
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return books.find(book => book.id === args.id)
                // Get db / api data
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});