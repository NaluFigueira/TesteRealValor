import React from 'react';
import { Button, Typography } from '@material-ui/core';
import { IoLogoBitcoin } from 'react-icons/io';
import PropTypes from 'prop-types';
import { FaDollarSign } from 'react-icons/fa';
import { Container, InvestmentTypeContainer, OptionContainer } from './styles';

export default function Selector({
  title,
  option1,
  option2,
  onSelectOption,
  hasIcons,
}) {
  return (
    <Container>
      <Typography align="center" variant="h3" color="textPrimary" gutterBottom>
        {title}
      </Typography>
      <InvestmentTypeContainer>
        <OptionContainer>
          {hasIcons && <IoLogoBitcoin size={64} style={{ color: '#ffc947' }} />}
          <Button
            color="secondary"
            style={{ fontSize: 20 }}
            onClick={() => onSelectOption(1)}
          >
            {option1}
          </Button>
        </OptionContainer>
        <OptionContainer>
          {hasIcons && <FaDollarSign size={64} style={{ color: '#ffc947' }} />}
          <Button
            color="secondary"
            style={{ fontSize: 20 }}
            onClick={() => onSelectOption(2)}
          >
            {option2}
          </Button>
        </OptionContainer>
      </InvestmentTypeContainer>
    </Container>
  );
}

Selector.defaultProps = {
  hasIcons: false,
};

Selector.propTypes = {
  title: PropTypes.string.isRequired,
  option1: PropTypes.string.isRequired,
  option2: PropTypes.string.isRequired,
  onSelectOption: PropTypes.func.isRequired,
  hasIcons: PropTypes.bool,
};
