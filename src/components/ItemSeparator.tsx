/* eslint-disable react-native/no-inline-styles */
import React, { useContext } from 'react';
import { View } from 'react-native';
import { ThemeContext } from '../context/themeContext/ThemeContext';

export const ItemSeparator = () => {
  return (
    <View
      style={{
        borderBottomWidth: 1,
        marginVertical: 8,
        borderBottomColor: '#000',
        opacity: 0.2,
      }}
    />
  );
};
