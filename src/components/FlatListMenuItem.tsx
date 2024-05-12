import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import { MenuItem } from '../interfaces/menuItem';

interface Props {
  menuItem: MenuItem;
}

export const FlatListMenuItem = ({ menuItem }: Props) => {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => navigation.navigate(menuItem.component)}>
      <View style={styles.container}>
        <Icon name={menuItem.icon} color='#000' size={23} />

        <Text
          style={{
            ...styles.itemText,
            color: '#000'
          }}>
          {menuItem.name}
        </Text>

        <View style={{ flex: 1 }} />

        <Icon name="chevron-forward-outline" color='#000' size={20} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  itemText: {
    marginLeft: 10,
    fontSize: 16,
  },
});
