import mongoose from 'mongoose'

const Schema = mongoose.Schema

const SummonerSchema = new Schema({
  summonerName: String,
  name: String,
  summonerId: Number,
  accountId: Number,
  region: String,
  level: Number,
  avatar: Number,
  updatedAt: Date,
  masteryPoints: Number,
  championMasteries: [{
    championLevel: Number,
    chestGranted: Boolean,
    championPoints: Number,
    championPointsSinceLastLevel: Number,
    playerId: Number,
    championPointsUntilNextLevel: Number,
    tokensEarned: Number,
    championId: Number,
    lastPlayTime: Date    
  }],
  leaguePositions: [{
    queueType: String,
    hotStreak: Boolean,
    wins: Number,
    veteran: Boolean,
    losses: Number,
    playerOrTeamId: String,
    leagueName: String,
    playerOrTeamName: String,
    inactive: Boolean,
    rank: String,
    freshBlood: Boolean,
    leagueId: String,
    tier: String,
    leaguePoints: Number,
  }],
  matches: [{
    lane: String,
    gameId: Number,
    champion: Number,
    platformId: String,
    timestamp: Number,
    queue: Number,
    role: String,
    season: Number
  }],
})

export default mongoose.model('Summoner', SummonerSchema)
