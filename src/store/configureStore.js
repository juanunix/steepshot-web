import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise';
import {createLogger} from 'redux-logger';
import rootReducer from '../reducers'

let storeBase;

export default function configureStore(initialState) {
	const init = initialState || {};
  const logger = createLogger();
  const store = createStore(
    rootReducer,
		init,
    applyMiddleware(thunk, promise, logger)
  );
  setStoreBase(store);
  return store;
}

function setStoreBase(newStore) {
  storeBase = newStore;
}

export function getStore() {
  if (!storeBase) {
    return configureStore();
  }
  return storeBase;
}
