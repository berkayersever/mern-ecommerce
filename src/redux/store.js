import reducer from './reducer';        // Import the reducer to export it with the reducer.
import { createStore } from 'redux';    // Import createStore that will create a store from redux.

// Export the reducer with redux devtools
export default createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());