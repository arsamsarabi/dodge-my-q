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
      errorMessages: {},
      runes: [],
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
      errorMessages: {},
      runes: [],
    })
  };

  init = async () => {
    await this.getDdVersion()
    await this.getRunesData()
    await this.getChampions()
  }

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

  getRunesData = (cb) => {
    if (!this.state.ddVersion) {
      this.getDdVersion(this.getRunesData)
    } else {
      axios.get(`http://ddragon.leagueoflegends.com/cdn/${this.state.ddVersion}/data/en_US/runesReforged.json`)
        .then(response => {
          this.setState({
            runes: response.data,
          })
          if (cb) cb()
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  getSummonerByName = async (summonerName, region, history = null) => { 
    const uri = `${API}/getSummonerByName/${region}/${encodeURIComponent(summonerName)}`
    await axios.get(uri)
      .then(response => {
        this.setState({
          summoner: response.data,
          isLoading: false,
        })
        if (history) {
          history.push(`summoner/${region}/${response.data.name}`)          
        }
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
      axios.get(`https://ddragon.leagueoflegends.com/cdn/${this.state.ddVersion}/data/en_US/champion.json`)
        .then(response => {
          const championsObject = response.data.data
          let champions = []
          Object.keys(championsObject).forEach(key => {
            champions.push(championsObject[key])
          })
          this.setState({ champions })
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  lookupLiveMatch = (id, region, cb) => {
    this.setState({ isLoading: true })
    axios.get(`${API}/getLiveGameBySummonerID/${region}/${id}`)
      .then(response => {
        const errorMessages = this.state.errorMessages
        errorMessages.liveMatch = null
        this.setState({
          match: response.data,
          isLoading: false,
          errorMessages,
        })
        this.setState({  })
        if (cb) cb()
      })
      .catch(error => {
        const errorMessages = this.state.errorMessages
        errorMessages.liveMatch = error.response.status === 404 ? 'Summoner is not in a live game' : null
        this.setState({
          isLoading: false,
          errorMessages,
        })
        console.log(error)
      })
  }

}
