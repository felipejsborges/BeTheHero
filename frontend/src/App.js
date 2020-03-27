import React from 'react';
// import logo from './logo.svg'; - // linha removida por termos excluído o logo.svg
// import './App.css'; - //linha removida por termos excluído o App.cs
import './global.css'
import Routes from './routes'; //n preciso por o index pq automaticamente ele procura pelo arquivo index

function App() {
  return (
  //aqui tinha várias coisa por padrão mas foram excluídas por ser desnecessárias ao nosso projeto
  <Routes />
  );
}

export default App;
