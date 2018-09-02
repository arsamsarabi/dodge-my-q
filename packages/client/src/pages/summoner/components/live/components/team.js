import React from 'react'
import Reflux from 'reflux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { rgba } from 'polished'
import Loading from 'components/loading/Loading'
import LeagueStore from 'stores/league/store'
import LeagueActions from 'stores/league/actions'
import {
  getChampionSquareImage,
  getChampionLoadingScreenImage,
} from 'config/staticData'
import Player from './player'

const Wrapper = styled.div`
  .bans {
    display: flex;
    margin-bottom: 24px;
    & > div:not(:first-of-type) {
      margin-left: 12px;
    }
    & > div {
      width: 35px;
      height: 35px;
      background-repeat: no-repeat;
      background-size: contain;
      border-radius: 5px;
      box-shadow: 1px 1px 10px 3px rgba(0, 0, 0, 0.3);
      position: relative;
      &:after,
      &:before {
        content: '';
        display: block;
        width: 125%;
        height: 10px;
        background-color: ${props => rgba(props.theme.danger, 0.3)};
        position: absolute;
        border-radius: 3px;
      }
      &:after{
        bottom: 0;
        transform: rotate(45deg) translate(-12px, -6px);
      }
      &:before {
        transform: rotate(-45deg) translate(-12px, 6px);
      }
    }
  }
  .players {
    display: flex;
    justify-content: space-around;
    height: 320px;
  }
`

class Team extends Reflux.Component {
  constructor(props) {
    super(props)
    this.stores = [LeagueStore]
    this.storeKeys = [
      'ddVersion',
      'champions',
      'runes',
      'matchPlayers',
      'summonerSpells',
    ]
  }

  componentDidMount() {
    if (this.props.players) {
      LeagueActions.getPlayersForMatch(this.props.players, this.props.region)
    }
  }

  render() {
    const {
      ddVersion,
      champions,
      runes,
      matchPlayers,
      summonerSpells,
    } = this.state
    const {
      players,
      bans,
      color,
    } = this.props

    

    if (!matchPlayers || matchPlayers.length < 4) {
      return <Loading/>
    } else {
      // console.log('players', players)
      // console.log('match players', matchPlayers)  
    }
    
    return(
      <Wrapper color={color}>
        <div className="bans">
          {bans.map(champ => {
            let champKey
            let backgroundImage
            champions.map(_champ => {
              if (parseInt(_champ.key) === champ.championId) champKey = _champ.id
            })
            if (champKey) {
              backgroundImage = {
                backgroundImage: `url(${getChampionSquareImage(ddVersion, champKey)})`
              }  
            } else {
              backgroundImage = {
                backgroundColor: 'black'
              }  
            }
            return <div
              key={champ.championId}
              style={backgroundImage}
            />
          })}
        </div>
        <div className="players">
          {players.map(player => {
            let champKey
            Object.keys(champions).map(key => {
              if (parseInt(champions[key].key) === player.championId) champKey = champions[key].id
            })
            const backgroundImage = {
              backgroundImage: `url(${getChampionLoadingScreenImage(champKey)})`
            }
          
            return <Player
              key={player.summonerId}
              player={player}
              color={color}
              background={backgroundImage}
              version={ddVersion}
              runes={runes}
              fullDetails={matchPlayers.find(detail => detail.summonerId === player.summonerId)}
              summonerSpells={summonerSpells}
            />
          })}
        </div>
      </Wrapper>
    )
  }
}

Team.propTypes = {
  color: PropTypes.oneOf([
    'blue',
    'red'
  ]).isRequired,
  players: PropTypes.arrayOf(PropTypes.object),
  bans: PropTypes.arrayOf(PropTypes.object),
  region: PropTypes.string.isRequired,
}

Team.defaultProps = {}

export default Team
