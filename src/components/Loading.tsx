import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export const Loading = () => {
  return (
    <View style={ styles.activitiContainer }>
        <ActivityIndicator
            size={ 50 }
            color="grey"
        />

        <Text>Cargando...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    activitiContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
