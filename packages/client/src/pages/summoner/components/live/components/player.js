import React from 'react'
import PropTypes from 'prop-types'
import { rgba } from 'polished'
import styled from 'styled-components'
import Loading from 'components/loading/Loading'
import { Text, H6 } from 'components/Text'
import theme from 'resources/styles/theme'
import {
  getRunesImage,
  getSummonerSpellsImage,
} from 'config/staticData'
import {
  getLeagueImage,
} from 'config/helpers'


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
    display: flex;
    flex-direction: column;
    /* justify-content: space-between; */
    .summonerName {
      font-size: 1rem;
      overflow: hidden;
      word-wrap: break-word;
      text-align: center;
      margin-top: 6px;
    }
    .player_rankedInfo {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .player_rankedImage {
        img {
          width: 50px;
          height: auto;
        }
      }
      .player_rankedname {

      }
    }
    .summonerSpells {
      margin-top: auto;
      img {
        max-width: 25px;
        max-height: 25px;
        &:first-of-type {
          margin-right: 4px;
        }
      }
    }
    .runes {
      .rune_row1,
      .rune_row2 {
        display: flex;
      }
      .rune_row1 {
        margin-bottom: 12px;
      }
      .rune_imagebox {
        max-width: 30px;
        max-height: 30px;
        &.topRune {
          max-width: 20px;
          max-height: 20px;
          &:first-of-type {
            margin-right: 12px;
          }
        }
      }
    }
  }
`

const Player = props => {
  const {
    player,
    color,
    background,
    version,
    runes,
    fullDetails,
    summonerSpells,
  } = props
  console.dir(player)
  // console.dir(fullDetails)

  if (!fullDetails) {
    return <Loading/>
  }

  const league = fullDetails.leaguePositions.find(league => league.queueType === 'RANKED_SOLO_5x5')
  
  return (
    <Wrapper color={color} style={background}>
      <div className="content">
        {/* -----------------------------------
          PLAYER NAME
        ----------------------------------- */}
        <Text
          color={theme.white}
          className="summonerName"
        >{player.summonerName}</Text>
        
        {/* -----------------------------------
          PLAYER RANKED IMAGE
        ----------------------------------- */}        
        <div
          className="player_rankedInfo"
        >
          <div className="player_rankedImage">
            <img src={getLeagueImage(league.tier, league.rank)} alt={`${player.summonerName}'s ranked tier image`}/>
          </div>
          <div className="player_rankedName">
            <H6 
              color={theme.white}
            >{`${league.tier} ${league.rank}`}</H6>
          </div>
        </div>
        {/* -----------------------------------
          SUMMONER SPELLS
        ----------------------------------- */}
        <div
          className="summonerSpells"
        >
          <img src={getSummonerSpellsImage(summonerSpells, player.spell1Id, version)} alt={`${player.summonerName}'s summoner spell image`}/>
          <img src={getSummonerSpellsImage(summonerSpells, player.spell2Id, version)} alt={`${player.summonerName}'s summoner spell image`}/>
        </div>


        {/* -----------------------------------
          RUNES
        ----------------------------------- */}
        <div className="runes">
          <div className="rune_row1">
            <div className="rune_imagebox topRune">
              <img src={getRunesImage(runes, player.perks.perkStyle, true)} alt="runes"/>
            </div>
            <div className="rune_imagebox topRune">
              <img src={getRunesImage(runes, player.perks.perkSubStyle, true)} alt="runes"/>
            </div>
          </div>
          <div className="rune_row2">
            {player.perks.perkIds.map(rune => {
              return (<div className="rune_imagebox" key={rune}>
                <img src={getRunesImage(runes, rune)} alt="runes"/>
              </div>)
            })}
          </div>
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
  runes: PropTypes.arrayOf(PropTypes.object).isRequired,
  fullDetails: PropTypes.object,
  summonerSpells: PropTypes.object,
}

Player.defaultProps = {
  fullDetails: undefined,
  summonerSpells: undefined,
}

export default Player
