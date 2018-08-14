import Summoner from '../models/Summoner'
import riot from './riot'

const fetchSummonerFromRito = async (data, callback) => {
  let newSummoner = {}

  newSummoner = await riot.getSummonerByName(data)
  newSummoner.masteryPoints = await riot.getSummonerMasteryPoints(data, newSummoner.summonerId)
  newSummoner.championMasteries = await riot.getSummonerChampionMasteries(data, newSummoner.summonerId)
  newSummoner.leaguePositions = await riot.getSummonerLeaguesPosition(data, newSummoner.summonerId)
  newSummoner.matches = await riot.getSummonerRecentMatches(data, newSummoner.accountId)
  
  // Save to DB and return response data
  saveSummoner(newSummoner, callback)
}

const saveSummoner = async (data, callback) => {
  let summoner = new Summoner(data)
  summoner.save((err, results) => {
    if (err) {
      callback(err)
    } else {
      callback(null, results)
    }    
  })
}

const service = {}

service.getSummonerByName = (data, callback) => {
  Summoner.find(data, (err, summoners) => {
    if (err) {
      callback(err)
    } else {
      if (summoners.length === 0) {
        fetchSummonerFromRito(data, saveSummoner, callback)
      } else {
        callback(null, summoners[0])
      }      
    }
  })

}

service.getLiveGameBySummonerID = async (data, callback) => {
  const result = await riot.getLiveGameBySummonerID(data)
  callback(null, result)
}

export default service
