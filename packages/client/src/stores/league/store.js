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
      ddVersion: '',
    }
  }

  reset = () => {
    this.setState({
      match: undefined,
      fullMatch: undefined,
      matchTimeLine: undefined,
      isLoading: false,
      ddVersion: '',
    })
  };

  getDdVersion = (cb) => {
    axios.get('https://ddragon.leagueoflegends.com/api/versions.json')
      .then(response => {
        this.setState({
          ddVersion: response.data[0],
        })
        if (cb) cb()
      })
      .catch(error => {
        console.log(error)
      })
  }

  lookupLiveMatchBySummonerName = (summonerName, region, cb) => {
    this.setState({ isLoading: true })
    this.lookupSummoner(summonerName, region, cb)
  }

  lookupSummoner = (summonerName, region, cb) => { 
    const uri = `${API}/getSummonerByName/${region}/${encodeURIComponent(summonerName)}`
    axios.get(uri)
      .then(response => {
        debugger;
        this.lookupMatch(response.data.summonerId, region, cb)
      })
      .catch(error => {
        this.setState({ isLoading: false })
        console.log(error)        
      })
  }
  
  getChampions = () => {
    if (!this.state.ddVersion) {
      this.getDdVersion(this.getChampions)
    } else {
      axios.get(`http://ddragon.leagueoflegends.com/cdn/${this.state.ddVersion}/data/en_US/champion.json`)
        .then(response => {
          const champions = response.data.data
          this.setState({ champions })
        })
        .catch(error => {
          console.log(error)
        })
    }
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
