import React from 'react'
import 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import store from './../Redux/store'
import RootContainer from './RootContainer'

const App = () => {
  return (
    <Provider store={store}>
      <RootContainer />
    </Provider>
  )
}

export default App
