import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { ProfileScreen } from '../../screens/Profile/ProfileScreen';
import { EditProfileScreen } from '../../screens/Profile/EditProfileScreen';
import { SettingsScreen } from '../../screens/Profile/SettingsScreen';
import { LanguageScreen } from '../../screens/Profile/LanguageScreen';

const Stack = createStackNavigator();

export const StackProfile = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="LanguageScreen" component={LanguageScreen} />
    </Stack.Navigator>
  );
};
