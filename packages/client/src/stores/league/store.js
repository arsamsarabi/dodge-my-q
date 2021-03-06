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
      ddVersion: undefined,
      champions: undefined,
      errorMessages: {},
      runes: [],
      matchPlayers: [],
      summonerSpells: {},
      notificationOpen: false,
      notificationMessage: '',
      notificationType: 'error',
      matchesToShow: undefined,
    }
  }

  reset = () => {
    this.setState({
      summoner: undefined,
      match: undefined,
      fullMatch: undefined,
      matchTimeLine: undefined,
      ddVersion: undefined,
      champions: undefined,
      errorMessages: {},
      runes: [],
      matchPlayers: [],
      summonerSpells: {},
      notificationOpen: false,
      notificationMessage: '',
      notificationType: 'error',
      matchesToShow: undefined,
    })
  };

  init = async () => {
    const ddVersion = await this.getDdVersion()
    const runes = await this.getRunesData(ddVersion)
    const champions = await this.getChampions(ddVersion)
    const summonerSpells = await this.getSummonerSpells(ddVersion)
    this.setState({
      ddVersion,
      runes,
      champions,
      summonerSpells
    })
  }

  dismissNotification = () => this.setState({
    notificationOpen: false,
    notificationMessage: '',
    notificationType: 'error',
  })

  getSummonerByName = (summonerName, region, cb = null) => { 
    const uri = `${API}/getSummonerByName/${region}/${encodeURIComponent(summonerName)}`
    axios.get(uri)
      .then(response => {
        this.setState({ summoner: response.data })
        if (cb) cb()
      })
      .catch(error => {
        if(error.response.status === 404) {
          console.log('Summoner not found')
          this.setState({
            notificationOpen: true,
            notificationMessage: 'Summoner not found',
            notificationType: 'error'
          })
        } else {
          console.dir(error)
        }
      })
  }

  updateSummoner = (summonerName, region) => {
    const uri = `${API}/updateSummoner/${region}/${encodeURIComponent(summonerName)}`
    axios.get(uri)
      .then(response => {
        this.setState({ summoner: response.data })
      })
      .catch(error => console.log(error))
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
    axios.get(`${API}/getLiveGameBySummonerID/${region}/${id}`)
      .then(response => {
        const errorMessages = this.state.errorMessages
        errorMessages.liveMatch = null
        this.setState({
          match: response.data,
          errorMessages,
        })
        if (cb) cb()
      })
      .catch(error => {
        const errorMessages = this.state.errorMessages
        errorMessages.liveMatch = error.response.status === 404 ? 'Summoner is not in a live game' : null
        this.setState({ errorMessages })
      })
  }

  getDetailsForMatches = matchesToShow => {
    matchesToShow.forEach(match => {
      console.log(match)
    })
  }

  /* -------------------------------------------------------------------------------
    INITIAL DATA FUNCTIONS
  ------------------------------------------------------------------------------- */
  getDdVersion = () => {
    return axios.get('https://ddragon.leagueoflegends.com/api/versions.json')
      .then(response => response.data[0])
      .catch(error => console.log(error))
  }

  getRunesData = version => {
    return axios.get(`http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/runesReforged.json`)
      .then(response => response.data)
      .catch(error => console.log(error))
  }

  getChampions = version => {
    return axios.get(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`)
      .then(response => {
        const championsObject = response.data.data
        let champions = []
        Object.keys(championsObject).forEach(key => {
          champions.push(championsObject[key])
        })
        return champions 
      })
      .catch(error => console.log(error))
  }

  getSummonerSpells = version => {
    return axios.get(`http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/summoner.json`)
      .then(response => response.data.data)
      .catch(error => console.log(error))
  }

}
