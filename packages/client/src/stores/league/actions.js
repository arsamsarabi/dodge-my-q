import Reflux from 'reflux'

const actions = Reflux.createActions([
  'init',
  'reset',
  'getSummonerByName',
  'lookupLiveMatch',
  'getRunesData',
  'getPlayersForMatch',
])

export default actions
