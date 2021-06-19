import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import Language from '../Language'

// import CustomStatusBar from '../Components/StatusBar'
// import Home from './HomeScreen';

const RootContainer = () => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Language />
        <ReduxNavigation />
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default RootContainer
