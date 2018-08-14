import React from 'react'
import PropTypes from 'prop-types'
import { rgba } from 'polished'
import styled from 'styled-components'
import { Text } from 'components/Text'
import theme from 'resources/styles/theme'
import {
  getLeagueImage,
  getRunesImage,
  getSummonerSpellsImage
} from 'config/staticData'

const Wrapper = styled.div`
  flex: 1;
  border-radius: 5px;
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: 5px;
  box-shadow: 1px 1px 10px 5px ${props => rgba(props.color === 'blue' ? props.theme.blue : props.theme.red, 0.3)};
  position: relative;
  color: ${props => props.theme.white};
  &:not(:first-of-type) {
    margin-left: 24px;
  }
  .content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.6);
    padding: 12px;
    border-radius: 5px;
    .summonerName {
      /* font-family: ${props => props.theme.fontHeading}; */
      font-size: 1rem;
      overflow: hidden;
      word-wrap: break-word;
      text-align: center;
      margin-top: 6px;
    }
  }
`

const Player = ({ player, color, background, version }) => {
  console.dir(player)
  return (
    <Wrapper color={color} style={background}>
      <div className="content">
        <Text
          color={theme.white}
          className="summonerName"
        >{player.summonerName}</Text>
        {/* <img src={getLeagueImage()} alt="jjj"/> */}
        <div className="runes">
          {
            player.perks.perkIds.map(rune => <img key={rune} src={getRunesImage(version, rune)} alt="jjj"/>)
          }
          {/* <img src={getLeagueImage()} alt="jjj"/> */}
          {/* <img src={getLeagueImage()} alt="jjj"/> */}
          {/* <img src={getLeagueImage()} alt="jjj"/> */}
          {/* <img src={getLeagueImage()} alt="jjj"/> */}
          {/* <img src={getLeagueImage()} alt="jjj"/> */}
          {/* <img src={getLeagueImage()} alt="jjj"/> */}
          {/* <img src={getLeagueImage()} alt="jjj"/> */}
          {/* <img src={getLeagueImage()} alt="jjj"/> */}
          {/* <img src={getLeagueImage()} alt="jjj"/> */}
        </div>
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
  version: PropTypes.string.isRequired,
}

Player.defaultProps = {}

export default Player
