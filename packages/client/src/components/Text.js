/*
  eslint
    "react/destructuring-assignment": "off",
    "no-nested-ternary": "off"
*/
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const H1 = styled.h1`
  color: ${props => props.color};
  font-family: 'Press Start 2P', Arial, Helvetica, sans-serif;
  font-size: 2em;
  line-height: 1.5;
  font-weight: ${props => props.weight};
  margin: 0;
  transition: all 300ms ease;
  ${props => props.underline && css`
    border-bottom: 1px 
      ${props.underlineStyle === 'dashed' ? 'dashed'
    : props.underlineStyle === 'dotted' ? 'dotted'
      : 'solid'}
      ${props.color || props.theme.text};
  `}
`

H1.propTypes = {
  color: PropTypes.string,
  weight: PropTypes.number,
  underline: PropTypes.bool,
  underlineStyle: PropTypes.oneOf(['solid', 'dashed', 'dotted']),
}

H1.defaultProps = {
  color: '#333',
  weight: 400,
  underline: false,
  underlineStyle: 'solid',
}

const H2 = H1.withComponent('h2').extend`
  font-size: 1.5em;
`
const H3 = H1.withComponent('h3').extend`
  font-size: 1.3em;
`
const H4 = H3.withComponent('h4').extend`
  font-size: 1em;
`
const H5 = H3.withComponent('h5').extend`
  font-size: 0.8em;
`
const H6 = H3.withComponent('h6').extend`
  font-size: 0.7em;
`
const Text = H1.withComponent('p').extend`
  font-family: 'Roboto', Arial, Helvetica, sans-serif;
  font-size: 1em;
`

export default Text
export { H1, H2, H3, H4, H5, H6, Text }
