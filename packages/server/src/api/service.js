import axios from 'axios'
import RIOT from './consts'

const axiosInstance = axios.create({
  headers: { 'X-Riot-Token': process.env.RIOT_API_KEY }
})

const service = {}

service.getSummonerByName = (data, callback) => {
  const url = `${RIOT.base}${data.region}${RIOT.summoner.getByName}${encodeURIComponent(data.summonerName)}`
  axiosInstance.get(url)
    .then(response => callback(null, response.data))
    .catch(error => callback(error))
}

service.getLiveGameBySummonerID = async (data, callback) => {
  axiosInstance.get(`${RIOT.base}${data.region}${RIOT.match.getMatchBySummonerId}${data.summonerId}`)
    .then(response => callback(null, response.data))
    .catch(error => callback(error))
}

// const getFullMatch = (region, gameId, callback) => {
//   console.log('getFullMatch')
//   axiosInstance.get(`${RIOT.base}${region}${RIOT.match.getFullMatchbyGameId}${gameId}`)
//     .then(response => {
//       result.fullMatch = response.data
//       console.log('result', result)
//       getMatchTimeline(region, gameId, callback)
//     })
//     .catch(error => callback(error))
// }

// const getMatchTimeline = (region, gameId, callback) => {
//   console.log('getMatchTimeline')
//   axiosInstance.get(`${RIOT.base}${region}${RIOT.match.getMatchTimeLineByMatchId}${gameId}`)
//     .then(response => {
//       result.timeLine = response.data
//       console.log('result', result)
//       callback(null, result)
//     })
//     .catch(error => callback(error))
// }

export default service
