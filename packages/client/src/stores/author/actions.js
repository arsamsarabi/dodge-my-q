import Reflux from 'reflux'

const actions = Reflux.createActions([
  'reset',
  'getAuthors',
  'createAuthor',
  'updateAuthor',
  'deleteAuthor',
])

export default actions
