import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Player from './player'

const Wrapper = styled.div`
  .bans {
    display: flex;
    margin-bottom: 24px;
    & > div:not(:first-of-type) {
      margin-left: 12px;
    }
  }
  .players {
    display: flex;
    justify-content: space-around;
    height: 200px;
  }
`

const Team = ({ players, bans, color }) => {
  return (
    <Wrapper color={color}>
      <div className="bans">
        {bans.map(champ => <div key={champ.championId}>{champ.championId}</div>)}
      </div>
      <div className="players">
        {players.map(player => <Player key={player.summonerId} player={player} color={color}/>)}
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
}

Team.defaultProps = {}

export default Team
