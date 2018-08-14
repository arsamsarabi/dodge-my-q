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
      summoner: undefined,
      match: undefined,
      fullMatch: undefined,
      matchTimeLine: undefined,
      isLoading: false,
      ddVersion: undefined,
      champions: undefined,
    }
  }

  reset = () => {
    this.setState({
      summoner: undefined,
      match: undefined,
      fullMatch: undefined,
      matchTimeLine: undefined,
      isLoading: false,
      ddVersion: undefined,
      champions: undefined,
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

  getSummonerByName = (summonerName, region, cb) => { 
    if (!this.state.isLoading) {
      this.setState({ isLoading: true })
    }
    const uri = `${API}/getSummonerByName/${region}/${encodeURIComponent(summonerName)}`
    axios.get(uri)
      .then(response => {
        if (cb) cb()
        this.setState({
          summoner: response.data,
          isLoading: false,
        })
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
