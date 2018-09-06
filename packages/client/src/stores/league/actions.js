import Reflux from 'reflux'

const actions = Reflux.createActions([
  'init',
  'reset',
  'getSummonerByName',
  'updateSummoner',
  'lookupLiveMatch',
  'getRunesData',
  'getPlayersForMatch',
  'dismissNotification'
])

export default actions
