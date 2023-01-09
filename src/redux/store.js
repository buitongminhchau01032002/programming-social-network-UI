import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './slices/orderSlice';
import accountReducer from './slices/accountSlide';
import userReducer from './slices/userSlice';

const localStorageMiddleware = (store) => (next) => (action) => {
    const result = next(action);
    // Save to localStorage
    const state = store.getState();
    localStorage.setItem('pmcs_user', JSON.stringify(state.user));

    return result;
};

const reHydrateStore = () => {
    if (localStorage.getItem('pmcs_user') !== null) {
        return {
            user: JSON.parse(localStorage.getItem('pmcs_user')),
        };
    }

    return {
        user: null,
    };
};

const store = configureStore({
    reducer: { order: orderReducer, account: accountReducer, user: userReducer },
    preloadedState: reHydrateStore(),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;
