import Reflux from 'reflux'

const actions = Reflux.createActions([
  'init',
  'reset',
  'getDdVersion',
  'getChampions',
  'getSummonerByName',
  'lookupLiveMatch',
  'getRunesData',
])

export default actions
