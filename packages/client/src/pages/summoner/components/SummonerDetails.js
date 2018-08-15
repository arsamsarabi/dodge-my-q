import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import styled from 'styled-components'
import Card from '@material-ui/core/Card'
import { profileIcon } from 'config/staticData'
import { H1, H6, Text } from 'components/Text'
import Button from '@material-ui/core/Button'

const Wrapper = styled.div`
  & > div {
    display: flex;
    margin-top: 25px;
    padding: 24px;
    & > img {
      width: 150px;
      height: 150px;
      margin-right: 24px;
      border-radius: 5px;
      box-shadow: 1px 1px 10px 5px rgba(0, 0, 0, 0.3);
    }
    .summoner_details {
      flex: 1;
      .summoner_info {
        h6 {
          font-size: 0.7rem;
          margin-top: 6px;
        }
        p {
          font-size: 0.8rem;
          margin-top: 6px;
          margin-bottom: 12px;
          & > span {
            font-size: 0.8rem;
            color: ${props => props.theme.darkGrey};
            font-style: italic;
          }
        }
      }
    }
  }
`

const SummonerDetails = ({ summoner, ddVersion, theme, updateSummoner }) => {
  const nowMinusOneHour = moment(new Date()).subtract(1, 'hour')
  const cantUpdate = moment(summoner.updated_at).isAfter(nowMinusOneHour)
  const minuteUntilUpdate = moment.duration(moment(summoner.updated_at).diff(nowMinusOneHour)).asMinutes().toFixed(0)
  return (
    <Wrapper>
      <Card>
        <img
          src={profileIcon(summoner.avatar, ddVersion)}
          alt={`${summoner.displayName}'s Profile Icon`}
        />
        <div className="summoner_details">
          <div className="summoner_info">
            <H1 color={theme.primary} underline underlineStyle="dotted">
              {summoner.displayName}
            </H1>
            <H6 color={theme.darkGrey}>
              {`Summoner Level: ${summoner.level} - Total Champion Masteries: ${summoner.masteryPoints}`}
            </H6>
            <Text>
              DmQ Profile updated at:
              {' '}
              {moment(summoner.updated_at).format('Do/MMM hh:mm')}
              {cantUpdate && <span>
                {` - You can update this profile again in ${minuteUntilUpdate} minutes`}
              </span>}
            </Text>
          </div>
          <div className="summoner_update">
            <Button
              onClick={() => updateSummoner()}
              color="primary"
              disabled={cantUpdate}
              variant="outlined"
            >
              Update
            </Button>
          </div>
        </div>
      </Card>
    </Wrapper>
  )
}

SummonerDetails.propTypes = {
  theme: PropTypes.object,
  ddVersion: PropTypes.string.isRequired,
  summoner: PropTypes.object.isRequired,
  updateSummoner: PropTypes.func.isRequired,
}

SummonerDetails.defaultProps = {
  theme: {},
}

export default SummonerDetails
