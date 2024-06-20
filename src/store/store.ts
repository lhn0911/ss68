import { createStore, combineReducers } from 'redux';
import ReducerProduct from '../store/reduces/ReduceProduct';
import ReducerCart from '../store/reduces/ReduceCart';
const rootReducer = combineReducers({
    products: ReducerProduct,ReducerCart
});

const store = createStore(rootReducer);

export default store;