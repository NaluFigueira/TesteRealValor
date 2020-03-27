import React, { useState } from 'react';
import Selector from './components/Selector';
import Graph from './components/Graph';

export default function App() {
  const [pageSelected, setPageSelected] = useState(1);
  const [optionsSelected, setOptionsSelected] = useState([]);

  const handleOnSelectOption = (option, page) => {
    setOptionsSelected([...optionsSelected, option]);
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
      return <Graph options={optionsSelected} />;
    default:
      return <></>;
  }
}
