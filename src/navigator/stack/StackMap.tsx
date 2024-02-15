import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { MapScreen } from '../../screens/Map/MapScreen';

const Stack = createStackNavigator();

export const StackMap = () => {
  return (
    <Stack.Navigator
        screenOptions={{
            headerShown: false,
            cardStyle: {
                backgroundColor: 'white',
            },
        }}
    >
      <Stack.Screen name="MapScreen" component={MapScreen} />
    </Stack.Navigator>
  );
};
