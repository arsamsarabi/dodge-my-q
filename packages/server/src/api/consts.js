const RIOT = {
  base: 'https://',
  summoner : {
    getByName: '.api.riotgames.com/lol/summoner/v3/summoners/by-name/',
    getChampionMasteries: '.api.riotgames.com/lol/champion-mastery/v3/champion-masteries/by-summoner/',
    getTotalMasteries: '.api.riotgames.com/lol/champion-mastery/v3/scores/by-summoner/',
    getSummonerLeagues: '.api.riotgames.com/lol/league/v3/leagues/by-summoner/',
    getSummonerLeaguesPositions: '.api.riotgames.com/lol/league/v3/positions/by-summoner/',
    getSummonerRecentMatches: '.api.riotgames.com/lol/match/v3/matchlists/by-account/'
  },
  champion: {
    getChampions: '.api.riotgames.com/lol/platform/v3/champions?freeToPlay=',
    getChampionById: '.api.riotgames.com/lol/static-data/v3/champions/',
    noFilterOpts: '?locale=en_US&tags=all'
  },
  match: {
    getMatchBySummonerId: '.api.riotgames.com/lol/spectator/v3/active-games/by-summoner/',
    getFullMatchbyGameId: '.api.riotgames.com/lol/match/v3/matches/',
    getMatchTimeLineByMatchId: '.api.riotgames.com/lol/match/v3/timelines/by-match/'
  }
}

export default RIOT
