/*
  eslint
    "react/destructuring-assignment": "off"
*/
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100vw;
  height: 50px;
  background-color: ${props => props.theme.primary};
  padding: 0 12px;
  & > .container {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1024px;
    margin: 0 auto;
    & > h4 {
      color:  ${props => props.theme.lightText};
    }
    & > .navigation {
      button {
        color:  ${props => props.theme.lightText};
      }
    }
  }
`;

Wrapper.propTypes = {
  theme: PropTypes.object,
};

Wrapper.defaultProps = {
  theme: {},
};

export default Wrapper;
