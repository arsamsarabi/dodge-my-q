/*
  eslint
    "import/extensions": "off"
*/
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import InfoOutlined from '@material-ui/icons/InfoOutlined';
import Close from '@material-ui/icons/close';
import { rankedQueueNames } from 'config/staticData';
import { getLeagueImage } from 'config/helpers';
import pixelSprite from 'resources/images/pixel_sprite.png'
import LabelAndText from 'components/LabelAndText';
import { H5 } from 'components/Text';
import LeagueIconsHelper from './LeagueIconsHelper';

const Wrapper = styled.div`
  font-size: 0.8rem;
  & > div {
    .rowOne {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      padding: 24px 24px 0 24px;
      h5 {
        width: 100%;
      }
      & > .eachLeague {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        & > div {
          width: 100%;
        }
        .leagueImage {
          text-align: center;
          img {
            width: 150px;
          }
        }
        .leagueDetails {
          
        }
        .leagueStatusImages {
          margin-top: 12px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          & > div {
            width: 35px;
            height: 35px;
            overflow: hidden;
            background-repeat: no-repeat;
            &.freshblood {
              background-position: -204px -849px;
            }
            &.veteran {
              background-position: -406px -407px;
            }
            &.hotstreak {
              background-position: -67px -679px;
            }
            &.inactive {
              background-position: -373px -780px;
            }
          }
        }
      }
    }
    button {
      float: right;
      transition: 0.2s height ease-in-out;
    }
    .leagueIconsHelper {
      width: 100%;
      display: flex;
      flex-direction: column;
      height: 0;
      padding: 0;
      overflow: hidden;
      transition: 0.2s height ease-in-out;
      &.isActive {
        padding: 16px;
        border-top: 1px dotted ${props => props.theme.grey};
        height: 200px;
        transition: 0.2s height ease-in-out;
      }
      & > div:not(:first-of-type) {
        margin-top: 20px;
      }
    }    
  }
`;

class SummonerLeagues extends React.Component {
  state = {
    helpActive: false,
  };

  handleOnToggleHelp = () => this.setState({ helpActive: !this.state.helpActive });

  render() {
    const {
      leagues,
      theme,
    } = this.props;
    return (
      <Wrapper>
        <Card>
          <div className="rowOne">
            <H5 color={theme.primary} underline underlineStyle="dotted">
              Top Champions:
            </H5>
            {leagues.map(league => (
              <div
                key={league.leagueId}
                className="eachLeague"
              >
                <div className="leagueImage">
                  <img src={getLeagueImage(league.tier, league.rank)} alt=""/>
                  <LabelAndText
                    label={rankedQueueNames(league.queueType)}
                    text={`${league.tier} ${league.rank}`}
                  />
                </div>
                <div className="leagueDetails">
                  <LabelAndText
                    label="LP:"
                    text={league.leaguePoints}
                  />
                  <LabelAndText
                    label="Wins:"
                    text={league.wins}
                  />
                  <LabelAndText
                    label="Losses:"
                    text={league.losses}
                  />
                </div>
                {league.freshblood || league.veteran || league.hotstreak || league.inactive
                  ? <div className="leagueStatusImages">
                    {league.freshBlood && <div className="freshblood" style={{ backgroundImage: `url(${pixelSprite})` }}/>}
                    {league.veteran && <div className="veteran" style={{ backgroundImage: `url(${pixelSprite})` }}/>}
                    {league.hotStreak && <div className="hotstreak" style={{ backgroundImage: `url(${pixelSprite})` }}/>}
                    {league.inactive && <div className="inactive" style={{ backgroundImage: `url(${pixelSprite})` }}/>}
                  </div>
                  : ''
                }
              </div>
            ))}
          </div>
          <IconButton
            aria-label="Info"
            onClick={() => this.handleOnToggleHelp()}
          >
            {this.state.helpActive
              ? <Close/>
              : <InfoOutlined/>
            }
          </IconButton>
          <div className={['leagueIconsHelper', this.state.helpActive ? 'isActive' : ''].join(' ')}>
            <LeagueIconsHelper
              text="New to this tier"
              pos={[-204, -850]}
            />
            <LeagueIconsHelper
              text="Veteran"
              pos={[-407, -407]}
            />
            <LeagueIconsHelper
              text="On a hot Streak"
              pos={[-67, -681]}
            />
            <LeagueIconsHelper
              text="Inactive in this queue"
              pos={[-373, -781]}
            />
          </div>
        </Card>
      </Wrapper>
    );
  }
}

SummonerLeagues.propTypes = {
  leagues: PropTypes.arrayOf(PropTypes.object).isRequired,
  theme: PropTypes.object,
};

SummonerLeagues.defaultProps = {
  theme: {},
};

export default SummonerLeagues;
