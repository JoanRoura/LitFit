import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { ExerciseScreen } from '../../screens/Exercise/ExerciseScreen';

const Stack = createStackNavigator();

export const StackExercise = () => {
  return (
    <Stack.Navigator
        screenOptions={{
            headerShown: false,
            cardStyle: {
                backgroundColor: 'white',
            },
        }}
    >
      <Stack.Screen name="ExerciseScreen" component={ExerciseScreen} />
    </Stack.Navigator>
  );
};
