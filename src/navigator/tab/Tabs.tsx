import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { StackRoutine } from '../stack/StackRoutine';
import { StackCustom } from '../stack/StackCustom';
import { StackExercise } from '../stack/StackExercise';
import { StackMap } from '../stack/StackMap';
import { StackProfile } from '../stack/StackProfile';

const Tab = createBottomTabNavigator();

export const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="StackRoutine" component={ StackRoutine } />
      <Tab.Screen name="StackCustom" component={ StackCustom } />
      <Tab.Screen name="StackExercise" component={ StackExercise } />
      <Tab.Screen name="StackMap" component={ StackMap } />
      <Tab.Screen name="StackProfile" component={ StackProfile } />
    </Tab.Navigator>
  );
};
