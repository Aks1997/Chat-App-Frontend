import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Aux from './Hoc/Auxiliary';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Aux/>
      </BrowserRouter>
    </div>
  );
}

export default App;
