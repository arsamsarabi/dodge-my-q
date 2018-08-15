import styled from 'styled-components'
import { pageContainer } from 'resources/styles/helpers'

const Wrapper = styled.div`
  ${pageContainer()}
  padding-top: 24px;
  .match_info {
    padding: 24px;
    & > div.details {
      flex: 1;
      & > .row {
        display: flex;
        align-items: center;
        &.row_one {
          margin-bottom: 12px;
          p {
            font-size: 0.9rem;
            color: ${props => props.theme.darkGrey};
            &:first-of-type {
              margin-right: 12px;
            }
            &:last-of-type {
              margin-left: auto;
            }
          }
        }
        &.row_two {
          h4 {
            color: ${props => props.theme.primary};
            &:not(:first-of-type) {
              margin-left: 12px;
            }
          }
          button {
            margin-left: auto;
          }
        }
      }
    }
  }
  .teams {
    padding: 24px;
    margin-top: 24px;
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
