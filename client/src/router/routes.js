import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Builder from './../core/builder';
import View from './../core/view';


const routes = () => (
	<Switch>
		<Route exact path="/builder" exact component={Builder} />
		<Route path="/view" exact component={View} />
	</Switch>
);

export default routes;
