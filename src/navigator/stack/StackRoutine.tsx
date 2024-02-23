import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { RoutineScreen } from '../../screens/Routine/RoutineScreen';
import { RoutineDetailsScreen } from '../../screens/Routine/RoutineDetailsScreen';
import { Routine } from '../../interfaces/routineInterface';

export type RootStackParams = {
  RoutineScreen: undefined,
  RoutineDetailsScreen: Routine;
}

const Stack = createStackNavigator<RootStackParams>();

export const StackRoutine = () => {
  return (
    <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
    >
      <Stack.Screen name="RoutineScreen" component={RoutineScreen} />
      <Stack.Screen name="RoutineDetailsScreen" component={RoutineDetailsScreen} />
    </Stack.Navigator>
  );
};
