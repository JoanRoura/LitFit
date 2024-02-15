import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { RoutineScreen } from '../screens/Routine/RoutineScreen';
import { CustomScreen } from '../screens/Custom/CustomScreen';
import { ExerciseScreen } from '../screens/Exercise/ExerciseScreen';
import { MapScreen } from '../screens/Map/MapScreen';
import { ProfileScreen } from '../screens/Profile/ProfileScreen';

const Stack = createStackNavigator();

export const Navigator = () => {
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
      <Stack.Screen name="CustomScreen" component={CustomScreen} />
      <Stack.Screen name="ExerciseScreen" component={ExerciseScreen} />
      <Stack.Screen name="MapScreen" component={MapScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
};
