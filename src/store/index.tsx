import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";

import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage';

import { composeWithDevTools } from 'redux-devtools-extension';

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
	whitelist: ['authentication']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// create store for application;
const store = createStore(
	persistedReducer, composeWithDevTools(
  applyMiddleware(thunk))
);

const persistor = persistStore(store);

export { store, persistor };

export default () => {
	return { store, persistor }
}
