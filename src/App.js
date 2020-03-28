import React, { useState } from 'react';
import { subYears, addMonths, format } from 'date-fns';
import { pt } from 'date-fns/locale';
import Selector from './components/Selector';
import Graph from './components/Graph';
import api from './services/api';

export default function App() {
  const [pageSelected, setPageSelected] = useState(1);
  const [optionsSelected, setOptionsSelected] = useState([]);
  const [data, setData] = useState([]);

  const calculateYieldTreasuryDirect = (
    totalValue,
    initialDate,
    numberOfYears
  ) => {
    const rate = 1.1 ** (1 / 12) - 1;
    let accumulatedYield = totalValue + totalValue * rate;
    let date = initialDate;
    const graphData = [];
    for (let i = 0; i < 12 * numberOfYears; i += 1) {
      graphData.push({
        month: format(date, "MMMM 'de' yyyy", { locale: pt }),
        yield: Math.round(accumulatedYield * 100) / 100,
      });
      date = addMonths(date, 1);
      accumulatedYield += accumulatedYield * rate;
    }
    setData(graphData);
  };

  async function getBitcoinPricesFromDay(day) {
    try {
      const response = await api.get('', {
        params: {
          ids: 'BTC',
          convert: 'BRL',
          start: format(new Date(day), "yyyy'-'MM'-'dd'T'hh':'mm':'ss'Z'"),
          end: format(new Date(), "yyyy'-'MM'-'dd'T'hh':'mm':'ss'Z'"),
        },
      });
      return response.data[0];
    } catch (error) {
      return null;
    }
  }

  const calculateYieldBitcoin = async (totalValue, initialDate) => {
    let accumulatedYield = totalValue;
    const graphData = [];
    const bitcoinPrices = await getBitcoinPricesFromDay(initialDate);
    let initialBitcoinValue = bitcoinPrices.prices[0];
    for (let i = 1; i < bitcoinPrices.timestamps.length; i += 1) {
      const date = bitcoinPrices.timestamps[i];
      const rate = parseFloat(bitcoinPrices.prices[i]) / initialBitcoinValue;
      graphData.push({
        month: format(new Date(date), "dd 'de' MMMM", { locale: pt }),
        yield: Math.round(accumulatedYield * 100) / 100,
      });
      accumulatedYield *= rate;
      initialBitcoinValue = parseFloat(bitcoinPrices.prices[i]);
    }
    setData(graphData);
  };

  const processGraphData = () => {
    const [
      selectedInvestmentType,
      selectedDate,
      selectedValue,
    ] = optionsSelected;
    const initialDate = subYears(new Date(), selectedDate);
    const totalValue = selectedValue === 1 ? 2000 : 10000;
    if (selectedInvestmentType === 1)
      calculateYieldBitcoin(totalValue, initialDate);
    else calculateYieldTreasuryDirect(totalValue, initialDate, selectedDate);
  };

  const handleOnSelectOption = (option, page) => {
    setOptionsSelected([...optionsSelected, option]);
    if (page === 4) processGraphData();
    setPageSelected(page);
  };

  switch (pageSelected) {
    case 1:
      return (
        <Selector
          title="Selecione o tipo do investimento"
          option1="Bitcoin"
          option2="Tesouro Direto Pré-fixado"
          hasIcons
          onSelectOption={(option) => handleOnSelectOption(option, 2)}
        />
      );
    case 2:
      return (
        <Selector
          title="Selecione a data do investimento"
          option1="1 ano atrás"
          option2="2 anos atrás"
          onSelectOption={(option) => handleOnSelectOption(option, 3)}
        />
      );
    case 3:
      return (
        <Selector
          title="Selecione o valor inicial do investimento"
          option1="R$ 2.000,00"
          option2="R$ 10.000,00"
          onSelectOption={(option) => handleOnSelectOption(option, 4)}
        />
      );
    case 4:
      return <Graph data={data} />;
    default:
      return <></>;
  }
}
