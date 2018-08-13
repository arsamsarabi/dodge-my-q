import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
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
    }
  }
  .players {
    display: flex;
    justify-content: space-around;
    height: 300px;
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
          Object.keys(champions).map(key => {
            if (parseInt(champions[key].key) === champ.championId) champKey = champions[key].id
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
          return <Player key={player.summonerId} player={player} color={color} background={backgroundImage}/>
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
