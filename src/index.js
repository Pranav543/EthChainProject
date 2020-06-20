import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import  combineReducers  from './reducers';

import * as serviceWorker from './serviceWorker';
import App from './App';

function saveToLocalStorage(state){
	try{
		const serializedState = JSON.stringify(state)
		localStorage.setItem('state', serializedState)
	} catch(e) {
		console.log(e)
	}
}

function loadFromLocalStorage() {
	try{
		const serializedState = localStorage.getItem('state')
		if (serializedState === null) return undefined
		return JSON.parse(serializedState)
	} catch(e) {
		console.log(e)
		return undefined
	}
}

const persistedState = loadFromLocalStorage()

const store = createStore(combineReducers,persistedState);

console.log(store.getState())

store.subscribe(() => saveToLocalStorage(store.getState()))

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);

serviceWorker.unregister();
