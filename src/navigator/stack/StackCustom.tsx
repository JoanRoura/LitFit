import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { CustomScreen } from '../../screens/Custom/CustomScreen';
import { NewCustomRoutine } from '../../screens/Custom/NewCustomRoutine';
import { RoutineDetailsScreen } from '../../screens/Routine/RoutineDetailsScreen';
import { Routine } from '../../interfaces/routineInterface';

export type RootStackParams = {
  CustomScreen: undefined,
  NewCustomRoutine: undefined,
  RoutineDetailsScreen: Routine,
}

const Stack = createStackNavigator<RootStackParams>();

export const StackCustom = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="CustomScreen" component={CustomScreen} />
      <Stack.Screen name="NewCustomRoutine" component={NewCustomRoutine} />
      <Stack.Screen name="RoutineDetailsScreen" component={RoutineDetailsScreen} />
    </Stack.Navigator>
  );
};
