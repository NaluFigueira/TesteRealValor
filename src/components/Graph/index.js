import React from 'react';
import { Typography, Button, CircularProgress } from '@material-ui/core';
import PropTypes from 'prop-types';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { Container, InvestmentTypeContainer, TooltipContainer } from './styles';

const renderLegend = () => {
  return (
    <Typography
      align="center"
      variant="caption"
      color="textPrimary"
      gutterBottom
    >
      Rendimento acumulado
    </Typography>
  );
};

const renderTooltip = ({ payload, label, active }) => {
  if (active) {
    return (
      <TooltipContainer>
        <Typography
          align="center"
          variant="subtitle2"
          color="primary"
          gutterBottom
        >
          Rendimento acumulado em {label}
        </Typography>
        <Typography
          align="center"
          variant="subtitle1"
          color="secondary"
          gutterBottom
        >
          R$ {payload[0].value}
        </Typography>
      </TooltipContainer>
    );
  }
  return null;
};

export default function Graph({ data, onBackButtonClick }) {
  return (
    <Container>
      <Typography align="center" variant="h3" color="textPrimary" gutterBottom>
        Veja como foi seu rendimento acumulado até hoje
      </Typography>
      <Button variant="contained" color="secondary" onClick={onBackButtonClick}>
        VOLTAR AO INICIO
      </Button>
      <InvestmentTypeContainer>
        {data.length > 0 ? (
          <LineChart
            width={1000}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis axisLine={false} dataKey="month" tick={{ fill: 'white' }} />
            <YAxis axisLine={false} tick={{ fill: 'white' }} />
            <Tooltip content={renderTooltip} />
            <Legend
              wrapperStyle={{ top: 310 }}
              iconSize={24}
              formatter={renderLegend}
            />
            <Line
              type="monotone"
              dataKey="yield"
              stroke="#ffc947"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        ) : (
          <CircularProgress color="secondary" />
        )}
      </InvestmentTypeContainer>
    </Container>
  );
}

renderTooltip.propTypes = {
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
    })
  ).isRequired,
  label: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
};

Graph.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      month: PropTypes.string,
      yield: PropTypes.number,
    })
  ).isRequired,
  onBackButtonClick: PropTypes.func.isRequired,
};
