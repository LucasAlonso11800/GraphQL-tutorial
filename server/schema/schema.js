const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLSchema
} = graphql;

// dummy data
const books = [
    { name: 'A Game of Thrones', genre: 'Fantasy', id: '1', authorId: '1' },
    { name: 'A Clash of Kings', genre: 'Fantasy', id: '2', authorId: '1' },
    { name: 'A Storm of Swords', genre: 'Fantasy', id: '3', authorId: '1' },
    { name: 'A Feast for Crows', genre: 'Fantasy', id: '4', authorId: '1' },
    { name: 'A Dance with Dragons', genre: 'Fantasy', id: '5', authorId: '1' },
    { name: 'The Winds of Winter', genre: 'Fantasy', id: '6', authorId: '1' },
    { name: 'A Dream of Spring', genre: 'Fantasy', id: '7', authorId: '1' },
    { name: 'The Hobbit', genre: 'Fantasy', id: '8', authorId: '2' },
    { name: 'The Silmarillion', genre: 'Fantasy', id: '9', authorId: '2' },
    { name: 'The Children of Hurin', genre: 'Fantasy', id: '10', authorId: '2' },
    { name: 'Around the World in Eighty Days', genre: 'Adventure', id: '11', authorId: '3' },
    { name: 'Journey to the Center of the Earth', genre: 'Adventure', id: '12', authorId: '3' }
];

const authors = [
    { name: 'George R.R. Martin', age: 72, id: '1' },
    { name: 'J.R.R. Tolkien', age: 81, id: '2' },
    { name: 'Jules Verne', age: 77, id: '3' },
]

// Types
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args){
                return authors.find(author => author.id === parent.authorId)
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return books.find(book => book.id === args.id)
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return authors.find(author => author.id === args.id)
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});