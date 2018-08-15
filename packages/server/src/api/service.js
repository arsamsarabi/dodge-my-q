import Summoner from '../models/Summoner'
import riot from './riot'

const fetchSummonerFromRito = async (data, callback) => {
  let newSummoner = {}
  newSummoner = await riot.getSummonerByName(data)
  const masteryPoints = await riot.getSummonerMasteryPoints(data, newSummoner.summonerId)
  const championMasteries = await riot.getSummonerChampionMasteries(data, newSummoner.summonerId)
  const leaguePositions = await riot.getSummonerLeaguesPosition(data, newSummoner.summonerId)
  const matches = await riot.getSummonerRecentMatches(data, newSummoner.accountId)
  
  Promise.all([
    masteryPoints, championMasteries, leaguePositions, matches
  ]).then(values => {
    newSummoner.masteryPoints = values[0]
    newSummoner.championMasteries = values[1]
    newSummoner.leaguePositions = values[2]
    newSummoner.matches = values[3]
    saveSummoner(newSummoner, callback)
  })
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
  Summoner.find({
    name: data.name.toLowerCase().replace(/\s/g, ''),
    region: data.region,
  }, (err, summoners) => {
    if (err) {
      callback(err)
    } else {
      if (summoners.length === 0) {
        fetchSummonerFromRito(data, callback)
      } else {
        callback(null, summoners[0])
      }      
    }
  })

}

service.getLiveGameBySummonerID = async (data, callback) => {
  riot.getLiveGameBySummonerID(data, callback)
}

export default service
