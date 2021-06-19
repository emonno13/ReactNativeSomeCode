import React from 'react';
import { Dimensions, ImageBackground, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import Animated from 'react-native-reanimated';

import { Colors } from '../Themes';

// Theme
// import {DefaultTheme, DarkTheme} from '../Themes';
import BottomTabBar from '../Components/BottomTabBar';

// Screens
import SplashScreen from '../Containers/SplashScreen';
import { SignInScreen } from '../Containers/SignInScreen';

import { TestScreen } from '../Containers/TestScreen';
import { NewsFeedScreen } from '../Containers/NewsFeedScreen';

import { setAppNavigator } from '../Navigation/AppNavigator';

// createHomeTabNavigation
export type HomeTabParams = {
  TestScreen: undefined;
  NewsFeedScreen: undefined;
};

const Tab = createBottomTabNavigator<HomeTabParams>();

function HomeTabs() {
  return (
    <Animated.View style={StyleSheet.flatten([styles.stack, style])}>
      <Tab.Navigator tabBar={(props) => <BottomTabBar {...props} />}>
        <Tab.Screen name={'TestScreen'} component={TestScreen} />
        <Tab.Screen name={'NewsFeedScreen'} component={NewsFeedScreen} />
      </Tab.Navigator>
    </Animated.View>
  );
}

// createAuthStackNavigation
export type AuthStackParams = {
  StartUpScreen: undefined;
  SignUpScreen: undefined;
  SignInScreen: undefined;
};
const AuthStack = createStackNavigator<AuthStackParams>();
function AuthStacks() {
  return (
    <AuthStack.Navigator
      initialRouteName={'SignInScreen'}
      headerMode={'none'}
      screenOptions={{ gestureEnabled: false }}
    >
      <AuthStack.Screen name={'SignInScreen'} component={SignInScreen} />
    </AuthStack.Navigator>
  );
}

// We gather all the app's screens here
export type AppStackParams = {
  HomeTab: undefined;
};
const AppStack = createStackNavigator<AppStackParams>();
function AppStacks() {
  return (
    <AppStack.Navigator initialRouteName={'HomeTab'} headerMode={'none'}>
      <AppStack.Screen name={'HomeTab'} component={HomeTabs} />
    </AppStack.Navigator>
  );
}

export type RootStackParams = {
  SplashScreen: undefined;
  AuthStack: undefined;
  AppStack: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

const AppNavigation = () => {
  const scheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <AppearanceProvider>
        <NavigationContainer ref={setAppNavigator}>
          <Stack.Navigator
            initialRouteName={'SplashScreen'}
            headerMode={'none'}
          >
            <Stack.Screen name={'SplashScreen'} component={SplashScreen} />
            <Stack.Screen name={'AuthStack'} component={AuthStacks} />
            <Stack.Screen name={'AppStack'} component={AppStacks} />
          </Stack.Navigator>
        </NavigationContainer>
      </AppearanceProvider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  drawerStyles: { flex: 1, backgroundColor: 'transparent' },
  stack: {
    flex: 1,
    shadowColor: '#FFF',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 5,
    // overflow: 'scroll',
    // borderWidth: 1,
  },
  drawerContent: {
    flex: 1,
    paddingVertical: 16,
  },
  profile: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 44 / 2,
    marginHorizontal: 4,
  },
  profileName: {
    fontSize: 22,
    fontWeight: '500',
    marginHorizontal: 4,
  },
  dividerContainer: {
    paddingHorizontal: 50,
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: Colors.black,
    marginTop: 16,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    alignItems: 'center',
    marginTop: 32,
    padding: 8,
    marginRight: 16,
    paddingLeft: 16,
  },
  focusMenuItem: {
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    backgroundColor: 'tomato',
  },
  focusedMenuLabel: {
    marginHorizontal: 8,
    fontSize: 14,
    color: Colors.white,
  },
  menuLabel: {
    marginHorizontal: 8,
    fontSize: 14,
    color: Colors.black,
  },
});

export default AppNavigation;
