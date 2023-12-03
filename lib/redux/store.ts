import { createStore } from 'redux';
import rootReducer from './rootReducer';

export const reduxStore = createStore(rootReducer);

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
