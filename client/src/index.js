import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import store from './store';

function isPrime(number) {
	if(number === 0 || number === 1) {
		return false;
	}
	for(let i = 2; i < number / 2; i++) {
		if(number % i === 0) {
			return false;
		}
	}
	return true;
}

console.log("Prime number 2:", isPrime(2));
console.log("Prime number 121:", isPrime(121));
console.log("Prime number 961:", isPrime(961));

console.log("Prime number 30983:", isPrime(30983));
console.log("Prime number 49:", isPrime(49));

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
