import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Exercise } from '../interfaces/exerciseInterface';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
    exercise: Exercise;
}

export const ExerciseCard = ({exercise}: Props) => {

    console.log(exercise.image);

  return (
    <TouchableOpacity activeOpacity={0.7} style={exerciseCardStyles.container}>
        <View style={exerciseCardStyles.containerImage}>
            <Image
                resizeMode="contain"
                source={{uri: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Curl.gif'}}
                style={exerciseCardStyles.imageExercise}
            />
        </View>

        <View style={exerciseCardStyles.containerInfoExercise}>
            <Text style={exerciseCardStyles.textNameExercise}>{exercise.name}</Text>

            <Text style={exerciseCardStyles.textSetsExercise}>4 sets x 8 reps</Text>
        </View>
    </TouchableOpacity>
  );
};

const exerciseCardStyles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 8,
    },

    containerImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
        backgroundColor: 'rgb(250, 250, 250)',
        marginRight: 16,
    },
    imageExercise: {
        width: '100%',
        height: '100%',
        borderRadius: 5,
    },

    containerInfoExercise: {
        display: 'flex',
        gap: 4,
    },
    textNameExercise: {
        color: '#000',
        fontSize: 14,
        fontWeight: 'bold',
    },
    textSetsExercise: {
        color: '#000',
        fontSize: 14,
    },
});
