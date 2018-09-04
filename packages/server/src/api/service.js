import Summoner from '../models/Summoner'
import riot from './riot'

const fetchSummonerFromRito = async (data, callback, mode) => {
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
    if (mode === 'save') {
      saveSummoner(newSummoner, callback)
    } else if (mode === 'update') {
      updateSummoner(newSummoner, callback)
    }
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

const updateSummoner = (data, callback) => {
  Summoner.findOneAndUpdate({ summonerId: data.summonerId }, data, {
    returnNewDocument: true,
  }, (err, results) => {
    if (err) {
      callback(err)
    } else {
      debugger;
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
        fetchSummonerFromRito(data, callback, 'save')
      } else {
        callback(null, summoners[0])
      }      
    }
  })
}

service.updateSummonerFromRiot = (data, callback) => fetchSummonerFromRito(data, callback, 'update')

service.getLiveGameBySummonerID = async (data, callback) => {
  riot.getLiveGameBySummonerID(data, callback)
}

export default service
