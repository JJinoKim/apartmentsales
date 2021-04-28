import React from 'react';
import Navigator from '~/Screen/Navigatior';

import {ApiContextProvider } from '~/Context/ApiData';


const App = () => {
  return (
    <ApiContextProvider>
      <Navigator />
    </ApiContextProvider>
  );
};

export default App;