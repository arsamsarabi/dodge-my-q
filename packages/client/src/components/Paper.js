/*
  eslint
    "react/destructuring-assignment": "off"
*/
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Paper = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
`;

Paper.propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  depth: PropTypes.oneOf([1, 2, 3, 4, 5, 6])
};

Paper.defaultProps = {
  width: '100%',
  height: '100%',
  depth: 1,
};

export default Paper;
