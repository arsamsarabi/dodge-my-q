import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text } from './Text';

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  text-align: left;
  /* width: 100%; */
  & > p:first-of-type {
    flex: 1;
  }
`;

const LabelAndText = ({ label, text }) => (
  <Wrapper>
    <Text weight={600}>
      {label}
    </Text>
    <Text>
      {text}
    </Text>
  </Wrapper>
);

LabelAndText.propTypes = {
  label: PropTypes.string.isRequired,
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export default LabelAndText;
