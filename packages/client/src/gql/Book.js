import { gql } from 'apollo-boost'

const BooksQueries = {}

const getBooks = gql`
  query {
    books(ids:[]) {
      id,
      name,
      genre,
      author {
        name,
        age,
      }
    }
  }
`

const addBook = gql`
  mutation (
    $name: String!,
    $genre: String!,
    $authorId: ID!
  ) {
    addBook(
      name: $name,
      genre: $genre,
      authorId: $authorId,
    ) {
      name,
      genre,
      author {
        name,
        age,
      }
    }
  }
`
BooksQueries.getBooks = getBooks
BooksQueries.addBook = addBook

export default BooksQueries
export {
  getBooks,
  addBook
}