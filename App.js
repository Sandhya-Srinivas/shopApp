import React from 'react'
import { Provider } from 'react-redux';
import store from './AppReduxFiles/store.js';

import DrawerTrial from './AppComponents/HomeComponents/RoutesMain.js';

const App = ()=>{
  return(
    <Provider store={store}>
      <DrawerTrial/>
    </Provider>
  )
}

export default App