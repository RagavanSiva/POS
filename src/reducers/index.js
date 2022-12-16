import { combineReducers } from 'redux'
import category from './category'
import product from './product'
import {alert} from './alert.reducer'


export default combineReducers({
    category,
    alert,product
 })