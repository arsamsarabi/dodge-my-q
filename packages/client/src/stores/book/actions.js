import Reflux from 'reflux'

const actions = Reflux.createActions([
  'reset',
  'getBooks',
  'createBook',
  'updateBook',
  'deleteBook',
])

export default actions
