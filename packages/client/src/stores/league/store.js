import Reflux from 'reflux'
import axios from 'axios'
// import { urlFriendly } from 'config/helpers'
import LeagueActions from './actions'

const API = process.env.DEV_BASE_API

export default class store extends Reflux.Store {
  constructor() {
    super()
    this.listenToMany(LeagueActions)
    this.state = {
      match: undefined,
      fullMatch: undefined,
      matchTimeLine: undefined,
      isLoading: false,
    }
  }

  reset = () => {
    this.setState({
      match: undefined,
      isLoading: false,
    })
  };

  lookupLiveMatchBySummonerName = (summonerName, region, cb) => {
    this.setState({ isLoading: true })
    this.lookupSummoner(summonerName, region, cb)
  }

  lookupSummoner = (summonerName, region, cb) => { 
    const uri = `${API}/getSummonerByName/${region}/${encodeURIComponent(summonerName)}`
    axios.get(uri)
      .then(response => this.lookupMatch(response.data.id, region, cb))
      .catch(error => {
        this.setState({ isLoading: false })
        console.log(error)        
      })
  }
  
  lookupMatch = (id, region, cb) => {
    axios.get(`${API}/getLiveGameBySummonerID/${region}/${id}`)
      .then(response => {
        this.setState({ match: response.data })
        this.setState({ isLoading: false })
        if (cb) cb()
      })
      .catch(error => {
        this.setState({ isLoading: false })
        console.log(error)
      })
  }

}
