import { gql } from 'apollo-boost'

const AuthorsQueries = {}

const getAuthors = gql`
  query {
    authors(ids:[]) {
      id,
      name,
      age,
      books {
        name,
        genre,
      }
    }
  }
`
AuthorsQueries.getAuthors = getAuthors

export default AuthorsQueries
export { getAuthors }