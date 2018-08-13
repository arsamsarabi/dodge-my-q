import Reflux from 'reflux'

const actions = Reflux.createActions([
  'reset',
  'getDdVersion',
  'getChampions',
  'lookupLiveMatchBySummonerName',
])

export default actions
