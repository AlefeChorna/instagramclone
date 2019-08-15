import React from 'react';
import { StatusBar } from 'react-native';

import Routes from './routes';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor="#F5F5F5" barStyle="dark-content" />
      <Routes />
    </>
  );
};

export default App;
