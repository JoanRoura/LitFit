/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { FlatList, Image, Platform, StyleSheet, Text, View } from 'react-native';

import { RootStackParams } from '../../navigator/stack/StackRoutine';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useExercise } from '../../hooks/useExercise';
import { ExerciseCard } from '../../components/ExerciseCard';
import { RoutineProfileCard } from '../../components/RoutineProfileCard';
import { Routine } from '../../interfaces/routineInterface';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useExercisesByRoutine } from '../../hooks/useExercisesByRoutine';


interface Props extends StackScreenProps<RootStackParams, 'RoutineDetailsScreen'> { }

export const RoutineDetailsScreen = ({ navigation, route }: Props) => {

  const { top } = useSafeAreaInsets();

  const { id: idRoutine } = route.params;

  const { exercisesByRoutine } = useExercisesByRoutine(idRoutine);

  return (
    <>
      <View
        style={{
          ...routineDetailsStyles.container,
          marginBottom: (Platform.OS === 'ios') ? 80 : 60,
        }}
      >

        {/* Boton de 'Go Back' */}
        <TouchableOpacity
          style={{
            ...routineDetailsStyles.backButton,
            marginTop: (Platform.OS === 'ios') ? top - 10 : top + 10,
          }}
          // ? En el onPress naveguem a la pagina anterior
          onPress={() => navigation.pop()}
        >
          <Icon
            name="arrow-back-outline"
            color="black"
            size={30}
          />
        </TouchableOpacity>

        <View style={routineDetailsStyles.containerTitleImageRoutine}>
          <View style={ routineDetailsStyles.containerTitleRoutine }>
            <Text style={ routineDetailsStyles.routineTitle }>{ route.params.name }</Text>
          </View>

          <View style={routineDetailsStyles.containerImage}>
            <Image
              resizeMode="contain"
              source={ require('../../assets/images/bench_press.jpeg')}
              style={ routineDetailsStyles.routineImage }
            />
          </View>
        </View>

        {/* // TODO: Valora on queda millor el component  */}
        {/* <RoutineProfileCard routine={route.params} /> */}

        <FlatList
          data={exercisesByRoutine}
          keyExtractor={(exercise) => exercise.id!.toString()}
          showsVerticalScrollIndicator={false}

          ListHeaderComponent={(
            <View>
              <RoutineProfileCard routine={route.params} />

              <Text style={routineDetailsStyles.textNumberExercises}>
                {exercisesByRoutine.length} exercises
              </Text>
            </View>
          )}

          renderItem={({ item }) => <ExerciseCard exercise={item} />}
        />

      </View>
    </>
  );
};

const routineDetailsStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
  },
  backButton: {
    top: 10,
    left: 0,
    marginBottom: 20,
  },
  containerTitleImageRoutine: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  containerTitleRoutine: {
    width: 250,
  },
  routineTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    textTransform: 'uppercase',
  },

  containerImage: {
    width: 100,
    height: 100,
  },
  routineImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  textNumberExercises: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 16,
    marginBottom: 6,
  },

  containerExercises: {
    backgroundColor: 'blue',
    marginBottom: 50,
  },
});
