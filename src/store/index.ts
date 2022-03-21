import {createStore, applyMiddleware, Store, compose, Middleware} from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducer/rootReducer';
import rootSaga from './saga/rootSaga';

const configureStore = (
  initialState = {},
  additionalMiddleware: Middleware[] = [],
) => {
  const sagaMiddleware = createSagaMiddleware();

  const store: Store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...additionalMiddleware, sagaMiddleware)),
  );

  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
