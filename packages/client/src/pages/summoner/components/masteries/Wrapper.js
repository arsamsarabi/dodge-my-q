import styled from 'styled-components'
import { pageContainer } from 'resources/styles/helpers'

const Wrapper = styled.div`
  ${pageContainer()}
  margin-top: 24px;
  .championMastery_container {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    padding: 12px;
    & > div {
      width: 33.3333333333%;
      margin: 6px 0;
    }
    &:after {
      content: "";
      flex: auto;
    }
  }
`

Wrapper.propTypes = {

}

Wrapper.defaultProps = {

}

export default Wrapper
