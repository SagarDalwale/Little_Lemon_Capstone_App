import React, { useState, useEffect, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';

import Onboarding from './src/screens/Onboarding';
import Home from './src/screens/Home';
import Profile from './src/screens/Profile';

const Stack = createNativeStackNavigator();
export const AuthContext = createContext();

export default function App() {
  const [state, setState] = useState({
    isLoading: true,
    isOnboarded: false,
  });

  useEffect(() => {
    const loadStorage = async () => {
      try {
        const onboarded = await AsyncStorage.getItem('isOnboarded');
        setState({
          isLoading: false,
          isOnboarded: onboarded === 'true',
        });
      } catch (e) {
        setState({ isLoading: false, isOnboarded: false });
      }
    };
    loadStorage();
  }, []);

  const authContextValue = {
    onboard: async (userData) => {
      await AsyncStorage.setItem('userProfile', JSON.stringify(userData));
      await AsyncStorage.setItem('isOnboarded', 'true');
      setState({ isLoading: false, isOnboarded: true });
    },
    logout: async () => {
      await AsyncStorage.clear();
      setState({ isLoading: false, isOnboarded: false });
    },
  };

  if (state.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#495E57" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!state.isOnboarded ? (
            <Stack.Screen name="Onboarding" component={Onboarding} />
          ) : (
            <>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Profile" component={Profile} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}