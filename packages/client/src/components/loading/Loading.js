import React from 'react'
import PropTypes from 'prop-types'
import ReactLoading from 'react-loading'
import { theme } from '../../resources/styles/theme'
import Wrapper from './Wrapper'

const Loading = ({ type, color, width, height }) => (
  <Wrapper>
    <ReactLoading type={type} color={color} height={height} width={width} />
  </Wrapper>
)

Loading.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
}

Loading.defaultProps = {
  type: 'cylon',
  color: theme.accent,
  width: 200,
  height: 200,
}

/*
blank
balls
bars
bubbles
cubes
cylon
spokes
spin
spinningBubbles
*/

export default Loading
