import styled from 'styled-components'
import { pageContainer } from 'resources/styles/helpers'

const Wrapper = styled.div`
  ${pageContainer()}
  padding-top: 50px;
  .match_info {
    padding: 24px;
    display: flex;
    & > div.details {
      flex: 1;
    }
    & > div.button {
      display: flex;
      align-items: flex-end;
    }
  }
  .teams {
    padding: 24px;
    margin-top: 48px;
    display: flex;
    flex-direction: column;
    & > div:first-of-type {
      margin-bottom: 48px;
    }
  }
`

Wrapper.propTypes = {

}

Wrapper.defaultProps = {

}

export default Wrapper
