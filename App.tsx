import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@shopify/restyle';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { theme } from './src/components/Theme';
import {AuthenticationNavigation} from './src/Authentication'

export default function App() {
  return (
    <ThemeProvider {...{theme}}>
      <StatusBar style="light" />
      <NavigationContainer>
        <SafeAreaProvider>
          <AuthenticationNavigation />
        </SafeAreaProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
}
