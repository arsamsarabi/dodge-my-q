import Reflux from 'reflux'
import axios from 'axios'
import AuthorActions from './actions'

export default class store extends Reflux.Store {
  constructor() {
    super();
    this.listenToMany(AuthorActions)
    this.state = {
      authors: null,
    }
  }

  reset = () => {
    this.setState({
      authors: null,
    });
  };

  getAuthors = () => {}
  
  createAuthor = () => {}
  
  updateAuthor = () => {}
  
  deleteAuthor = () => {}
}
