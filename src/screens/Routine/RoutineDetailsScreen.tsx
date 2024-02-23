import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

import { RootStackParams } from '../../navigator/stack/StackRoutine';

const windowWidth = Dimensions.get('window').width;

interface Props extends StackScreenProps<RootStackParams, 'RoutineDetailsScreen'> {}

export const RoutineDetailsScreen = ({ navigation, route }: Props) => {


  const uri = 'https://gweb-research-imagen.web.app/compositional/An%20oil%20painting%20of%20a%20British%20Shorthair%20cat%20wearing%20a%20cowboy%20hat%20and%20red%20shirt%20skateboarding%20on%20a%20beach./1_.jpeg';

  return (
    <ScrollView
      style={ routineDetailsStyles.container }
    >

      {/* Boton de 'Go Back' */}
      <TouchableOpacity
        style={routineDetailsStyles.backButton}
        // ? En el onPress naveguem a la pagina anterior
        onPress={() => navigation.pop()}
      >
        <Icon
          name="arrow-back-outline"
          color="black"
          size={30}
        />
      </TouchableOpacity>

      <View style={ routineDetailsStyles.containerTitleImageRoutine }>
        <View style={ routineDetailsStyles.containerTitleRoutine }>
          <Text style={ routineDetailsStyles.routineTitle }>{route.params.name}</Text>
        </View>

        <View>
          <Image
            source={{ uri }}
            style={ routineDetailsStyles.routineImage }
          />
        </View>
      </View>

    </ScrollView>
  );
};

const routineDetailsStyles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
  },
  backButton: {
    top: 10,
    left: 0,
  },
  containerTitleImageRoutine: {
    flex: 1,
  },
  containerTitleRoutine: {
    marginTop: 30,
    width: 200,
  },
  routineTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
    textTransform: 'uppercase',
  },
  routineImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    position: 'absolute',
    top: 0,
    right: 0,
  }
});
