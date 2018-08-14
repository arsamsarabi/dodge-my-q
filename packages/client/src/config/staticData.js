const staticData = {}

const profileIcon = (id, version) => `http://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${id}.png`
staticData.profileIcon = profileIcon

const rankedQueueNames = id => {
  switch (id) {
  case 'RANKED_SOLO_5x5':
    return 'Solo Queue'
  case 'RANKED_FLEX_SR':
    return 'Flex Queue'
  case 'RANKED_FLEX_TT':
    return 'Twisted Treeline Ranked'
  default:
    break
  }
}
staticData.rankedQueueNames = rankedQueueNames

const gameModes = egg => {
  switch (egg) {
  case 'CLASSIC':
    return 'Classic Game'
  case 'ODIN':
    return 'Dominion/Crystal Scar'
  case 'ARAM':
    return 'Aram'
  case 'TUTORIAL':
    return 'Tutorial'
  case 'DOOMBOTSTEEMO':
    return 'Doom Bot'
  case 'ONEFORALL':
    return 'One for All'
  case 'ASCENSION':
    return 'Ascension'
  case 'FIRSTBLOOD':
    return 'Snowdown'
  case 'KINGPORO':
    return 'Legend of the Poro King'
  case 'SIEGE':
    return 'Nexus Siege'
  case 'ASSASSINATE':
    return 'Blood Hunt Assassin'
  case 'ARSR':
    return 'All Random Summoner\'s Rift'
  case 'DARKSTAR':
    return 'Dark Star: Singularity'
  case 'STARGUARDIAN':
    return 'Star Guardian Invasion'
  case 'PROJECT':
    return 'PROJECT: Hunters'
  case 'URF':
    return 'URF'
  default:
    return 'Classic'
  }
}
staticData.gameModes = gameModes

const gameTypes = egg => {
  switch (egg) {
  case 'CUSTOM_GAME':
    return 'Custom game'
  case 'TUTORIAL_GAME':
    return 'Tutorial game'
  case 'MATCHED_GAME':
    return 'All other games'
  default:
    return 'Classic'
  }
}
staticData.gameTypes = gameTypes

const getChampionSquareImage = (version, key) => `http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${key}.png`
staticData.getChampionSquareImage = getChampionSquareImage

const getChampionLoadingScreenImage = key => `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${key}_0.jpg`
staticData.getChampionLoadingScreenImage = getChampionLoadingScreenImage

const getRunesImage = (version, key) => `http://ddragon.leagueoflegends.com/cdn/${version}/img/rune/${key}.png`
staticData.getRunesImage = getRunesImage

const getSummonerSpellsImage = (version, key) => `http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${key}.png`
staticData.getSummonerSpellsImage = getSummonerSpellsImage

export default staticData
export {
  profileIcon,
  rankedQueueNames,
  gameModes,
  gameTypes,
  getChampionSquareImage,
  getChampionLoadingScreenImage,
  getRunesImage,
  getSummonerSpellsImage,
}
