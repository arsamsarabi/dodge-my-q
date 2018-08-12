import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
  flex: 1;
  border: 1px solid ${props => props.color === 'blue' ? props.theme.blue : props.theme.red};
  border-radius: 5px;
  padding: 12px;
  &:not(:first-of-type) {
    margin-left: 24px;
  }
`

const Team = ({ player, color }) => {
  return (
    <Wrapper color={color}>
      {player.summonerName}
    </Wrapper>
  )
}

Team.propTypes = {
  color: PropTypes.oneOf([
    'blue',
    'red'
  ]).isRequired,
  players: PropTypes.object,
}

Team.defaultProps = {}

export default Team
