import 'react-native-gesture-handler';

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { StackMain } from './src/navigator/stack/StackMain';

const App = () => {
  return (
    <NavigationContainer>
      <StackMain />
    </NavigationContainer>
  );
};

export default App;
