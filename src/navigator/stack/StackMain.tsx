import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { Tabs } from '../tab/Tabs';
import { StackAuth } from './StackAuth';
import { LoadingScreen } from '../../screens/Loading/LoadingScreen';

const Stack = createStackNavigator();

export const StackMain = () => {
  return (
    <Stack.Navigator
        screenOptions={{
            headerShown: false,
        }}
    >
      <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
      <Stack.Screen name="StackAuth" component={StackAuth} />
      <Stack.Screen name="MainTabs" component={Tabs} />
    </Stack.Navigator>
  );
};
