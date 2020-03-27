import React from 'react';
import { Button, Typography } from '@material-ui/core';
import { IoLogoBitcoin } from 'react-icons/io';
import { FaDollarSign } from 'react-icons/fa';
import { Container, InvestmentTypeContainer, OptionContainer } from './styles';

export default function App() {
  return (
    <Container>
      <Typography align="center" variant="h3" color="textPrimary" gutterBottom>
        Selecione o tipo do investimento
      </Typography>
      <InvestmentTypeContainer>
        <OptionContainer>
          <IoLogoBitcoin size={64} style={{ color: '#ffc947' }} />
          <Button color="secondary">Investimento em Bitcoin</Button>
        </OptionContainer>
        <OptionContainer>
          <FaDollarSign size={64} style={{ color: '#ffc947' }} />
          <Button color="secondary">
            Investimento em Tesouro Direto pré-fixado
          </Button>
        </OptionContainer>
      </InvestmentTypeContainer>
    </Container>
  );
}
