import axios from 'axios'
import RIOT from './consts'

const axiosInstance = axios.create({
  headers: { 'X-Riot-Token': process.env.RIOT_API_KEY }
})

const riot = {}

riot.getSummonerByName = async (data) => {
  const result = {}
  const summonerUrl = `${RIOT.base}${data.region}${RIOT.summoner.getByName}${encodeURIComponent(data.name)}`
  const response = await axiosInstance.get(summonerUrl).catch(error => console.error(error))
  
  result.summonerName = response.data.name
  result.name = response.data.name.toLowerCase().replace(/\s/g, '')
  result.summonerId = response.data.id
  result.accountId = response.data.accountId
  result.region = data.region
  result.level = response.data.summonerLevel
  result.avatar = response.data.profileIconId
  result.updated_at = new Date()
  
  return result
}

riot.getSummonerMasteryPoints = async (data, id) => {
  const masteryPointsUrl = `${RIOT.base}${data.region}${RIOT.summoner.getTotalMasteries}${id}`
  const response = await axiosInstance.get(masteryPointsUrl).catch(error => console.error(error))
  return response.data
}

riot.getSummonerChampionMasteries = async (data, id) => {
  const result = []
  const championMasteriesUrl = `${RIOT.base}${data.region}${RIOT.summoner.getChampionMasteries}${id}`
  const response = await axiosInstance.get(championMasteriesUrl).catch(error => console.error(error))

  response.data.forEach(mastery => {
    result.push({
      championLevel: mastery.championLevel,
      chestGranted: mastery.chestGranted,
      championPoints: mastery.championPoints,
      championPointsSinceLastLevel: mastery.championPointsSinceLastLevel,
      playerId: mastery.playerId,
      championPointsUntilNextLevel: mastery.championPointsUntilNextLevel,
      tokensEarned: mastery.tokensEarned,
      championId: mastery.championId,
      lastPlayTime: mastery.lastPlayTime,
    })
  })
      
  return result
}

riot.getSummonerLeaguesPosition = async (data, id) => {
  const result = []
  const leaguePositionsUrl = `${RIOT.base}${data.region}${RIOT.summoner.getSummonerLeaguesPositions}${id}`
  const response = await axiosInstance.get(leaguePositionsUrl).catch(error => console.error(error))
    
  response.data.forEach(position => {
    result.push({
      queueType: position.queueType,
      hotStreak: position.hotStreak,
      wins: position.wins,
      veteran: position.veteran,
      losses: position.losses,
      playerOrTeamId: position.playerOrTeamId,
      leagueName: position.leagueName,
      playerOrTeamName: position.playerOrTeamName,
      inactive: position.inactive,
      rank: position.rank,
      freshBlood: position.freshBlood,
      leagueId: position.leagueId,
      tier: position.tier,
      leaguePoints: position.leaguePoints
    })
  })

  return result
}

riot.getSummonerRecentMatches = async (data, id) => {
  const result = []
  const matchesUrl = `${RIOT.base}${data.region}${RIOT.summoner.getSummonerRecentMatches}${id}`
  const response = await axiosInstance.get(matchesUrl).catch(error => console.error(error))
    
  response.data.matches.forEach(match => {
    result.push({
      lane: match.lane,
      gameId: match.gameId,
      champion: match.champion,
      platformId: match.platformId,
      timestamp: match.timestamp,
      queue: match.queue,
      role: match.role,
      season: match.season,
    })
  })

  return result
}

riot.getLiveGameBySummonerID = async (data, callback) => {
  const liveMatchUrl = `${RIOT.base}${data.region}${RIOT.match.getMatchBySummonerId}${data.summonerId}`
  axiosInstance.get(liveMatchUrl)
    .then(response => {
      console.log(response)
      callback(null, response.data)
    })
    .catch(err => {
      console.error(err)
      const notInGameError = new Error('NOT IN A GAME')
      callback(notInGameError)
    })
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


export default riot
