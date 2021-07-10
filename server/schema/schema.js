const graphql = require('graphql');
const Author = require('../models/Author');
const Book = require('../models/Book');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLList,
    GraphQLSchema
} = graphql;


// Types
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return Author.findById(parent.authorId)
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find({ authorId: parent.id })
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            async resolve(parent, args) {
                return await Book.findById(args.id)
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            async resolve(parent, args) {
                return await Author.findById(args.id)
            }
        },
        books: {
            type: new GraphQLList(BookType),
            async resolve(parent, args) {
                return await Book.find()
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            async resolve(parent, args) {
                return await Author.find()
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: GraphQLString },
                age: { type: GraphQLInt }
            },
            async resolve(parent, args) {
                const { name, age } = args
                let author = new Author({
                    name,
                    age
                });
                return await author.save()
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
                authorId: { type: GraphQLID }
            },
            async resolve(parent, args) {
                const { name, genre, authorId } = args
                let book = new Book({
                    name,
                    genre,
                    authorId
                });
                return await book.save()
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});