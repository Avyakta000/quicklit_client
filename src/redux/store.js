import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './features/userAuth';
import authReducer from './features/userAuth';
import readReducer from './features/readSlice'
import categoryReducer from './features/categorySlice'
import recommendationsReducer from './features/recommendationsSlice';
import preferencesReducer from './features/preferenceSlice';
import commentsReducer from './features/commentsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    reads: readReducer,
    categories: categoryReducer,
    recommendations: recommendationsReducer,
    preferences: preferencesReducer,
    comments: commentsReducer,
  },
});
// initial state
console.log(process.env.NEXT_PUBLIC_BACKEND_URL, 'main store');
export default store;
