import 'intl';
import 'intl/locale-data/jsonp/pt-BR'; // importando regra de internacionalização para colocar R$ nos valores dos casos

import React from 'react';
import Routes from './src/routes';

export default function App() {
  return (
    <Routes />
  );
}