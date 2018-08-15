import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { rgba } from 'polished'
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
        background-color: ${props => rgba(props.theme.danger, 0.4)};
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

const Team = props => {
  const {
    players,
    bans,
    color,
    ddVersion,
    champions,
  } = props
  return (
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
          return <Player key={player.summonerId} player={player} color={color} background={backgroundImage} version={ddVersion}/>
        })}
      </div>
    </Wrapper>
  )
}

Team.propTypes = {
  color: PropTypes.oneOf([
    'blue',
    'red'
  ]).isRequired,
  players: PropTypes.arrayOf(PropTypes.object),
  bans: PropTypes.arrayOf(PropTypes.object),
  ddVersion: PropTypes.string.isRequired,
  champions: PropTypes.object,
}

Team.defaultProps = {
  champions: {}
}

export default Team
