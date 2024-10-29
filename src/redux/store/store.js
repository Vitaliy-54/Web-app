import { createStore, combineReducers } from 'redux';
import employeeReducer from '../reducers/employeeReducer';
import authReducer from '../reducers/authReducer';

const rootReducer = combineReducers({
  employees: employeeReducer,
  auth: authReducer,
});

const store = createStore(rootReducer);

export default store;
