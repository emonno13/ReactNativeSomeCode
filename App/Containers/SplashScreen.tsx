import React, { useEffect } from 'react'
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native'
import { RootStackParams } from '../Navigation/AppNavigation'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

type SplashScreenNavigationProp = StackNavigationProp<
  RootStackParams,
  'SplashScreen'
>

const SplashScreen = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>()

  useEffect(() => {
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'AuthStack' }],
      })
    }, 2000)
  })

  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size='large' color='#0000ff' />
    </SafeAreaView>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
