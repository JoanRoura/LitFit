import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { LoginScreen } from '../../screens/Auth/LoginScreen';
import { RegisterScreen } from '../../screens/Auth/RegisterScreen';

const Stack = createStackNavigator();

export const StackAuth = () => {
  return (
    <Stack.Navigator
        screenOptions={{
            headerShown: false,
        }}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    </Stack.Navigator>
  );
};
