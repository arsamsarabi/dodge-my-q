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
      matchPlayers: [],
      summonerSpells: {},
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
      matchPlayers: [],
      summonerSpells: {},
    })
  };

  init = () => {
    this.getDdVersion()
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

  getPlayersForMatch = (players, region) => {
    players.forEach(player => {
      const uri = `${API}/getSummonerByName/${region}/${encodeURIComponent(player.summonerName)}`
      axios.get(uri)
        .then(response => {
          let matchPlayers = this.state.matchPlayers
          matchPlayers.push(response.data)
          this.setState({
            matchPlayers,
          })
        })
        .catch(error => console.log(error))
    })
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

  /* -------------------------------------------------------------------------------
    INITIAL DATA FUNCTIONS
  ------------------------------------------------------------------------------- */
  getDdVersion = () => {
    axios.get('https://ddragon.leagueoflegends.com/api/versions.json')
      .then(response => {
        this.setState({
          ddVersion: response.data[0],
        })
        this.getRunesData()
      })
      .catch(error => {
        console.log(error)
      })
  }

  getRunesData = () => {
    axios.get(`http://ddragon.leagueoflegends.com/cdn/${this.state.ddVersion}/data/en_US/runesReforged.json`)
      .then(response => {
        this.setState({
          runes: response.data,
        })
        this.getChampions()
      })
      .catch(error => {
        console.log(error)
      })
  }

  getChampions = () => {
    axios.get(`https://ddragon.leagueoflegends.com/cdn/${this.state.ddVersion}/data/en_US/champion.json`)
      .then(response => {
        const championsObject = response.data.data
        let champions = []
        Object.keys(championsObject).forEach(key => {
          champions.push(championsObject[key])
        })
        this.setState({ champions })
        this.getSummonerSpells()
      })
      .catch(error => {
        console.log(error)
      })
  }

  getSummonerSpells = () => {
    axios.get(`http://ddragon.leagueoflegends.com/cdn/${this.state.ddVersion}/data/en_US/summoner.json`)
      .then(response => {
        console.log(response.data.data)
        this.setState({ summonerSpells: response.data.data })
      })
      .catch(error => {
        console.log(error)
      })
  }

}
