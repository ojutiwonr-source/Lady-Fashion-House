import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import fashionReducer from './reducers/fashionReducer';
import runwayReducer from './reducers/runwayReducer';

const rootReducer = combineReducers({
  fashion: fashionReducer,
  runway: runwayReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
