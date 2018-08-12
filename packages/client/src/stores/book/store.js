import Reflux from 'reflux'
import axios from 'axios'
import BookActions from './actions'

export default class store extends Reflux.Store {
  constructor() {
    super();
    this.listenToMany(BookActions)
    this.state = {
      books: null,
    }
  }

  reset = () => {
    this.setState({
      books: null,
    });
  };

  getBooks = () => {}
  
  createBook = () => {}
  
  updateBook = () => {}
  
  deleteBook = () => {}
}
