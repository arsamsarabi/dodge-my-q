/*
  eslint
    "camelcase": "off",
    "complexity": "off",
*/

import {
  bronze_i,
  bronze_ii,
  bronze_iii,
  bronze_iv,
  bronze_v,
  silver_i,
  silver_ii,
  silver_iii,
  silver_iv,
  silver_v,
  gold_i,
  gold_ii,
  gold_iii,
  gold_iv,
  gold_v,
  platinum_i,
  platinum_ii,
  platinum_iii,
  platinum_iv,
  platinum_v,
  diamond_i,
  diamond_ii,
  diamond_iii,
  diamond_iv,
  diamond_v,
  provisional,
  bronze,
  silver,
  gold,
  platinum,
  diamond,
  master,
  challenger,
} from './leagueImages'

const helpers = {}

const urlFriendly = username => username.toLowerCase().replace(/\s/g, '')
helpers.urlFriendly = urlFriendly

const getLeagueImage = (tier, rank) => {
  if (tier === 'CHALLENGER') {
    return challenger
  } else if (tier === 'MASTER') {
    return master
  } else if (tier === 'DIAMOND') {
    switch (rank) {
    case 'I':
      return diamond_i
    case 'II':
      return diamond_ii
    case 'III':
      return diamond_iii
    case 'IV':
      return diamond_iv
    case 'V':
      return diamond_v
    default:
      return diamond
    }
  } else if (tier === 'PLATINUM') {
    switch (rank) {
    case 'I':
      return platinum_i
    case 'II':
      return platinum_ii
    case 'III':
      return platinum_iii
    case 'IV':
      return platinum_iv
    case 'V':
      return platinum_v
    default:
      return platinum
    }
  } else if (tier === 'GOLD') {
    switch (rank) {
    case 'I':
      return gold_i
    case 'II':
      return gold_ii
    case 'III':
      return gold_iii
    case 'IV':
      return gold_iv
    case 'V':
      return gold_v
    default:
      return gold
    }
  } else if (tier === 'SILVER') {
    switch (rank) {
    case 'I':
      return silver_i
    case 'II':
      return silver_ii
    case 'III':
      return silver_iii
    case 'IV':
      return silver_iv
    case 'V':
      return silver_v
    default:
      return silver
    }
  } else if (tier === 'BRONZE') {
    switch (rank) {
    case 'I':
      return bronze_i
    case 'II':
      return bronze_ii
    case 'III':
      return bronze_iii
    case 'IV':
      return bronze_iv
    case 'V':
      return bronze_v
    default:
      return bronze
    }
  }
  return provisional
}
helpers.getLeagueImage = getLeagueImage

export default helpers
export {
  urlFriendly,
  getLeagueImage,
}
