import {configureStore} from '@reduxjs/toolkit';
import shopReducer from './reducers/shopReducer';
import userReducer from './reducers/userReducer';

export const store = configureStore({
    reducer:{
        shopReducer:shopReducer,
        userReducer:userReducer,
    }
})