import * as React from 'react';
import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';

// Navigation
import {AuthStackParams} from '../../Navigation/AppNavigation';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {CompositeNavigationProp} from '@react-navigation/native';
import {RootStackParams} from '../../Navigation/AppNavigation';

type SignInScreenNavigationProp = StackNavigationProp<
  AuthStackParams,
  'SignInScreen'
>;

type CombineNavigationProp = CompositeNavigationProp<
  SignInScreenNavigationProp,
  StackNavigationProp<RootStackParams>
>;

const SignInScreen = () => {
  const navigation = useNavigation<CombineNavigationProp>();

  const goHome = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'AppStack'}],
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goHome} style={styles.button}>
        <Text>SignIn</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
});
