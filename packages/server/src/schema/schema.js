import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull,
} from 'graphql'
import Book from '../models/Book'
import Author from '../models/Author'

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    authorId: { type: GraphQLID },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return Author.findById(parent.authorId)
      }
    },
  })
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books : {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({authorId: parent._id})
      }
    }
  })
})

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    books: {
      type: new GraphQLList(BookType),
      args: {
        ids: { type: new GraphQLList(GraphQLID) }
      },
      resolve(parent, args) {
        if (args.ids.length === 0) {
          return Book.find({})
        } else {
          const res = []
          args.ids.forEach(id => res.push(Book.findById(id)))
          return res
        }
      }
    },
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Book.findById(args.id)
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      args: {
        ids: { type: new GraphQLList(GraphQLID) }
      },
      resolve(parent, args) {
        if (args.ids.length === 0) {
          return Author.find({})
        } else {
          const res = []
          args.ids.forEach(id => res.push(Author.findById(id)))
          return res
        }
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Author.findById(args.id)
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLInt }
      },
      resolve(parent, args) {
        const author = new Author({
          name: args.name,
          age: args.age,
        })
        return author.save()
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: GraphQLString },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        })
        return book.save()
      }
    },
    updateAuthor: {
      type: AuthorType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve(parent, args) {
        const updatedAuthor = {}
        if (args.name) updatedAuthor.name = args.name
        if (args.age) updatedAuthor.age = args.age
        return Author.findByIdAndUpdate(args.id, updatedAuthor, { new: true })
      }
    },
    updateBook: {
      type: BookType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: { type: GraphQLID },
      },
      resolve(parent, args) {
        const updatedBook = {}
        if (args.name) updatedBook.name = args.name
        if (args.genre) updatedBook.genre = args.genre
        if (args.authorId) updatedBook.authorId = args.authorId
        return Book.findByIdAndUpdate(args.id, updatedBook, { new: true })
      }
    },
    deleteAuthor: {
      type: AuthorType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Author.findByIdAndRemove(args.id)
      }
    },
    deleteBook: {
      type: BookType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Book.findByIdAndRemove(args.id)
      }
    },
  }
})

export default new GraphQLSchema({
  query: Query,
  mutation: Mutation,
})