import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

import Builder from './core/builder';
import Routes from './router/routes';
import './App.css';

function App() {
  return (
	<Router>
		<Routes />
	</Router>
  );
}

export default App;
