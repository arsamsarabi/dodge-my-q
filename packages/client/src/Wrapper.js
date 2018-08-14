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
  .page_Wrapper {
    min-height: calc(100vh - 50px);
    height: calc(100vh - 50px);
    width: 100vw;
    margin: 0 auto;
    overflow-y: auto;
    padding: 4px 24px;
  }
`

Wrapper.propTypes = {
  theme: PropTypes.object,
}

Wrapper.defaultProps = {
  theme: {},
}

export default Wrapper
