import { combineReducers } from 'redux';
import categoriesReducer from './categoriesReducer';
import newsReducer from './newsReducer';

const rootReducer = combineReducers({
  categories: categoriesReducer,
  news: newsReducer,
});

export default rootReducer;