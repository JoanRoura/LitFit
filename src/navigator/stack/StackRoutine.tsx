import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { RoutineScreen } from '../../screens/Routine/RoutineScreen';

const Stack = createStackNavigator();

export const StackRoutine = () => {
  return (
    <Stack.Navigator
        screenOptions={{
            headerShown: false,
            cardStyle: {
                backgroundColor: 'white',
            },
        }}
    >
      <Stack.Screen name="RoutineScreen" component={RoutineScreen} />
    </Stack.Navigator>
  );
};
