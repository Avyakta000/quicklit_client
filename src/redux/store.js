import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/userAuth';
import readReducer from './features/readSlice'
const store = configureStore({
  reducer: {
    auth: authReducer,
    reads: readReducer,
  },
});

export default store;
