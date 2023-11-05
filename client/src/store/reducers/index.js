import { combineReducers } from 'redux';
import productReducer from './productwReducer';
import cartReducer from './cartReducer';
import categoryReducer from './categoryReducer';

const rootReducer = combineReducers({
  product: productReducer,
  cart: cartReducer,
  category: categoryReducer,
});

export default rootReducer;
