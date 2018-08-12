/*
  eslint
    "react/destructuring-assignment": "off"
*/
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
  color: ${props => props.theme.text};
  background-color: ${props => props.theme.lightGrey};
  overflow: hidden;
`

Wrapper.propTypes = {
  theme: PropTypes.object,
}

Wrapper.defaultProps = {
  theme: {},
}

export default Wrapper
