import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';

import reducers from './Reducers/index';

const saveState = (state) => {
  try {
    const stringifyState = JSON.stringify(state)
    localStorage.setItem('state', stringifyState);
  } catch(error) {
    alert('Theres error from redux store');
    console.log(error)
  }
}

const loadState = () => {
  try {
    const stateFromLocal = localStorage.getItem('state');
    if (stateFromLocal === null) {
      return undefined
    } else {
      return JSON.parse(stateFromLocal);
    }
  } catch(error) {
    alert('Theres error from redux store');
    console.log(error)
  }
}
const theState = loadState()

const logger = createLogger()
const store = createStore(
  reducers,
  theState,
  applyMiddleware(logger, promiseMiddleware)
)

store.subscribe(() => { saveState(store.getState()) } )


export default store