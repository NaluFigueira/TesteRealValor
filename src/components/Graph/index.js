import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { subYears, addMonths, format } from 'date-fns';
import { pt } from 'date-fns/locale';
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

export default function Graph({ options }) {
  const [data, setData] = useState([]);

  const calculateYieldTreasuryDirect = (
    totalValue,
    initialDate,
    numberOfYears
  ) => {
    const rate = 0.09163;
    const yieldRate = rate * totalValue;
    let accumulatedYield = yieldRate;
    let date = initialDate;
    const graphData = [];
    for (let i = 0; i < 12 * numberOfYears; i++) {
      graphData.push({
        month: format(date, "MMMM 'de' yyyy", { locale: pt }),
        yield: Math.round(accumulatedYield * 100) / 100,
      });
      date = addMonths(date, 1);
      accumulatedYield += yieldRate;
    }
    setData(graphData);
  };

  const calculateYieldBitcoin = (totalValue, initialDate, numberOfYears) => {
    const rate = 0.09163;
    const yieldRate = rate * totalValue;
    let accumulatedYield = yieldRate;
    let date = initialDate;
    const graphData = [];
    for (let i = 0; i < 12 * numberOfYears; i++) {
      graphData.push({
        month: format(date, "MMMM 'de' yyyy", { locale: pt }),
        yield: Math.round(accumulatedYield * 100) / 100,
      });
      date = addMonths(date, 1);
      accumulatedYield += yieldRate;
    }
    setData(graphData);
  };

  useEffect(() => {
    const selectedInvestmentType = options[0];
    const selectedDate = options[1];
    const selectedValue = options[2];
    const initialDate = subYears(new Date(), selectedDate);
    const totalValue = selectedValue === 1 ? 2000 : 10000;
    if (selectedInvestmentType === 1)
      calculateYieldBitcoin(totalValue, initialDate, selectedDate);
    else calculateYieldTreasuryDirect(totalValue, initialDate, selectedDate);
  }, []);

  const renderLegend = (value, entry) => {
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

  return (
    <Container>
      <Typography align="center" variant="h3" color="textPrimary" gutterBottom>
        Veja como foi seu rendimento acumulado até hoje
      </Typography>
      <InvestmentTypeContainer>
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
      </InvestmentTypeContainer>
    </Container>
  );
}

Graph.propTypes = {
  options: PropTypes.arrayOf(PropTypes.number).isRequired,
};
