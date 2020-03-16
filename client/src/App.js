import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/froala-design-blocks/dist/css/froala_blocks.css';

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
