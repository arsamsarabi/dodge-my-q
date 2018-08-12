import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import BookOutlined from '@material-ui/icons/BookOutlined'
import InfoOutlined from '@material-ui/icons/InfoOutlined'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { graphql, compose } from 'react-apollo'
import { H5, Text } from 'components/Text'
import Loading from 'components/loading/Loading'
import { getAuthors } from '../../gql/Author'
import { addBook, getBooks } from '../../gql/Book'

class AddBook extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bookName: '',
      bookAuthor: '',
      bookGenre: '',
    };
  }

  handleOnChange = event => this.setState({ [event.target.name]: event.target.value })

  handleSubmit = event => {
    event.preventDefault()
    const { addBook } = this.props
    const {
      bookName,
      bookGenre,
      bookAuthor,
    } = this.state
    addBook({
      variables: {
        name: bookName,
        genre: bookGenre,
        authorId: bookAuthor
      },
      refetchQueries: [{
        query: getBooks
      }]
    })
    this.setState({
      bookName: '',
      bookAuthor: '',
      bookGenre: '',
    })
  }

  renderAuthorMenuItems = () => {
    const {
      getAuthors,
    } = this.props;
    if (getAuthors.loading) {
      return <MenuItem>Loading Authors ...</MenuItem>
    } else {
      return getAuthors.authors.map(author => {
        return(
          <MenuItem
            key={author.id}
            value={author.id}
          >
            {author.name}
          </MenuItem>
        )
      })
    }
  }

  render() {
    const {
      bookName,
      bookAuthor,
      bookGenre,
    } = this.state;

    return (
      <div>
        <H5>
          Add a new Book
        </H5>
        <TextField
          id="bookname"
          name="bookName"
          label="Book Name"
          value={bookName}
          onChange={this.handleOnChange}
          margin="normal"
          autoFocus
          fullWidth
          onKeyPress={event => {
            if (event.key === 'Enter') {
              this.handleSubmit();
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BookOutlined/>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          id="bookgenre"
          name="bookGenre"
          label="Book Genre"
          value={bookGenre}
          onChange={this.handleOnChange}
          margin="normal"
          autoFocus
          fullWidth
          onKeyPress={event => {
            if (event.key === 'Enter') {
              this.handleSubmit();
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <InfoOutlined/>
              </InputAdornment>
            ),
          }}
        />
          <Select
            value={bookAuthor}
            onChange={this.handleOnChange}
            name="bookAuthor"
            label="Book Author"
            fullWidth
          >
            {this.renderAuthorMenuItems()}
          </Select>
          <Button
            variant="outlined"
            color="primary"
            onClick={this.handleSubmit}
            disabled={!bookName}
          >
            Submit
          </Button>
      </div>
    )
  }
}

export default compose(
  graphql(getAuthors, {name: "getAuthors"}),
  graphql(addBook, {name: "addBook"}),
  graphql(getBooks, {name: "getBooks"}),
)(AddBook)
