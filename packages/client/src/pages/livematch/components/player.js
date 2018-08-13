import React from 'react'
import PropTypes from 'prop-types'
import { rgba } from 'polished'
import styled from 'styled-components'

const Wrapper = styled.div`
  flex: 1;
  border-radius: 5px;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 5px;
  box-shadow: 1px 1px 10px 3px ${props => rgba(props.color === 'blue' ? props.theme.blue : props.theme.red, 0.3)};
  position: relative;
  color: ${props => props.theme.white};
  &:not(:first-of-type) {
    margin-left: 24px;
  }
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.4);
    padding: 12px;
  }
`

const Player = ({ player, color, background }) => {
  console.dir(player)
  return (
    <Wrapper color={color} style={background}>
      <div className="overlay">
        {player.summonerName}
      </div>
    </Wrapper>
  )
}

Player.propTypes = {
  color: PropTypes.oneOf([
    'blue',
    'red'
  ]).isRequired,
  player: PropTypes.object.isRequired,
  background: PropTypes.object.isRequired,
}

Player.defaultProps = {}

export default Player
