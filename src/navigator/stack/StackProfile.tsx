import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { ProfileScreen } from '../../screens/Profile/ProfileScreen';

const Stack = createStackNavigator();

export const StackProfile = () => {
  return (
    <Stack.Navigator
        screenOptions={{
            headerShown: false,
        }}
    >
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
};
