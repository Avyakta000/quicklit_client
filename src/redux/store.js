import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './features/userAuth';
import authReducer from './features/userAuth';
import readReducer from './features/readSlice'
import categoryReducer from './features/categorySlice'
import recommendationsReducer from './features/recommendationsSlice';
import preferencesReducer from './features/preferenceSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    reads: readReducer,
    categories: categoryReducer,
    recommendations: recommendationsReducer,
    preferences: preferencesReducer,
  },
});
// initial state
// console.log(store.getState(), 'main store');
export default store;
