import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import Loading from 'components/loading/Loading'
import { getBooks } from '../../gql/Book'

class Bookslist extends Component {
  render() {
    const {
      data,
    } = this.props;

    return (
      <div>
        <ul>
          { data.loading 
          ? <Loading/>
          : data.books.map(book => {
            return (
            <li key={book.id}>
              {book.name}
            </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default graphql(getBooks)(Bookslist)
