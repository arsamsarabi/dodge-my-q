import styled from 'styled-components'
import { pageContainer } from '../../resources/styles/helpers'

const Wrapper = styled.div`
  ${pageContainer()}
  padding-top: 50px;
  & > div {
    padding: 48px 24px;
    & > .logo {
      text-align: center;
      margin-bottom: 50px;
    }
    & > .searchbox {
      display: flex;
      align-items: center;
      padding: 0 22px;
      & > .searchbox_summoner {
        flex: 1;
        margin-right: 12px;
        & > div {
          margin: 0;
        }
      }
      & > .searchbox_region {
        margin-right: 12px;
      }
    }
  }
`

Wrapper.propTypes = {

}

Wrapper.defaultProps = {

}

export default Wrapper
