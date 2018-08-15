import Reflux from 'reflux'

const actions = Reflux.createActions([
  'reset',
  'getDdVersion',
  'getChampions',
  'getSummonerByName',
  'lookupLiveMatch',
])

export default actions
