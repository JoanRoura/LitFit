/* eslint-disable react/no-unstable-nested-components */
import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { StackRoutine } from '../stack/StackRoutine';
import { StackCustom } from '../stack/StackCustom';
import { StackExercise } from '../stack/StackExercise';
import { StackMap } from '../stack/StackMap';
import { StackProfile } from '../stack/StackProfile';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#1E3FC9',
        tabBarLabelStyle: {
          marginBottom: (Platform.OS === 'ios') ? 0 : 10,
        },
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'rgba(255,255,255, 1)',
          borderWidth: 0,
          elevation: 0,
          height: (Platform.OS === 'ios') ? 80 : 60,
        },
        headerShown: false,
      }}
    >

      <Tab.Screen
        name="StackRoutine"
        component={StackRoutine}
        options={{
          tabBarLabel: 'Routines',
          tabBarIcon: ({ color }) => (
            <Icon
              color={color}
              size={25}
              name="barbell-outline"
            />
          ),
        }}
      />

      <Tab.Screen
        name="StackCustom"
        component={StackCustom}
        options={{
          tabBarLabel: 'Custom',
          tabBarIcon: ({ color }) => (
            <Icon
              color={color}
              size={25}
              name="create-outline"
            />
          ),
        }}
      />

      <Tab.Screen
        name="StackExercise"
        component={StackExercise}
        options={{
          tabBarLabel: 'Exercises',
          tabBarIcon: ({ color }) => (
            <Icon
              color={color}
              size={25}
              name="grid-outline"
            />
          ),
        }}
      />

      <Tab.Screen
        name="StackMap"
        component={StackMap}
        options={{
          tabBarLabel: 'Map',
          tabBarIcon: ({ color }) => (
            <Icon
              color={color}
              size={25}
              name="map-outline"
            />
          ),
        }}
      />

      <Tab.Screen
        name="StackProfile"
        component={StackProfile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <Icon
              color={color}
              size={25}
              name="person-circle-outline"
            />
          ),
        }}
      />

    </Tab.Navigator>
  );
};
