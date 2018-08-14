/*
  eslint
    "no-unused-vars": "off"
*/
import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull,
  GraphQLBoolean,
} from 'graphql'
import Summoner from '../models/Summoner'

const championMasteriesType = new GraphQLObjectType({
  name: 'ChampionMasteries',
  fields: () => ({
    championLevel: { type: GraphQLInt },
    chestGranted: { type: GraphQLBoolean },
    championPoints: { type: GraphQLInt },
    championPointsSinceLastLevel: { type: GraphQLInt },
    playerId: { type: GraphQLInt },
    championPointsUntilNextLevel: { type: GraphQLInt },
    tokensEarned: { type: GraphQLInt },
    championId: { type: GraphQLInt },
    lastPlayTime: { type: GraphQLString }
  })
})

const leaguePositionType = new GraphQLObjectType({
  name: 'LeaguePositions',
  fields: () => ({
    queueType: { type: GraphQLString },
    hotStreak: { type: GraphQLBoolean },
    wins: { type: GraphQLInt },
    veteran: { type: GraphQLBoolean },
    losses: { type: GraphQLInt },
    playerOrTeamId: { type: GraphQLString },
    leagueName: { type: GraphQLString },
    playerOrTeamName: { type: GraphQLString },
    inactive: { type: GraphQLBoolean },
    rank: { type: GraphQLString },
    freshBlood: { type: GraphQLBoolean },
    leagueId: { type: GraphQLString },
    tier: { type: GraphQLString },
    leaguePoints: { type: GraphQLInt },
  })
})

const matchType = new GraphQLObjectType({
  name: 'MatchType',
  fields: () => ({
    lane: { type: GraphQLString },
    gameId: { type: GraphQLInt },
    champion: { type: GraphQLInt },
    platformId: { type: GraphQLString },
    timestamp: { type: GraphQLInt },
    queue: { type: GraphQLInt },
    role: { type: GraphQLString },
    season: { type: GraphQLInt }
  })
})

const SummonerType = new GraphQLObjectType({
  name: 'Summoner',
  fields: () => ({
    id: { type: GraphQLID },
    profileIconId: { type: GraphQLInt },
    name: { type: GraphQLString },
    summonerLevel: { type: GraphQLInt },
    accountId: { type: GraphQLInt },
    summonerId: { type: GraphQLInt },
    updatedAt: { type: GraphQLString },
    masteryPoints: { type: GraphQLInt },
    championMasteries: {
      type: championMasteriesType,
      resolve(parent, args) {
        return Summoner.findById(parent.id).championMasteries
      }
    },
    leaguePositionType: {
      type: championMasteriesType,
      resolve(parent, args) {
        return Summoner.findById(parent.id).leaguePositions
      }
    },
    matchType: {
      type: championMasteriesType,
      resolve(parent, args) {
        return Summoner.findById(parent.id).matches
      }
    },
  })
})

export default SummonerType