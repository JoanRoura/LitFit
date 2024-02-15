import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { CustomScreen } from '../../screens/Custom/CustomScreen';

const Stack = createStackNavigator();

export const StackCustom = () => {
  return (
    <Stack.Navigator
        screenOptions={{
            headerShown: false,
            cardStyle: {
                backgroundColor: 'white',
            },
        }}
    >
      <Stack.Screen name="CustomScreen" component={CustomScreen} />
    </Stack.Navigator>
  );
};
