import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Routine } from '../interfaces/routineInterface';

interface Props {
    routine: Routine;
}

export const RoutineProfileCard = ({ routine: { desc, muscle } }: Props) => {
  return (
    <View style={exercisesProfileCardStyles.container}>

        <Text style={exercisesProfileCardStyles.textTitleCard}>Routine Info</Text>

        <View>
            <Text style={exercisesProfileCardStyles.titleDescRoutine}>Description</Text>
            <Text style={exercisesProfileCardStyles.textDescRoutine}>{ desc }</Text>
        </View>

        <View>
            <Text style={exercisesProfileCardStyles.titleDescRoutine}>Muscles Involved</Text>
            <Text style={exercisesProfileCardStyles.textDescRoutine}>{ muscle }</Text>
        </View>
    </View>
  );
};

const exercisesProfileCardStyles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        gap: 8,
    },
    textTitleCard: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    titleDescRoutine: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    textDescRoutine: {
        color: '#000',
        textAlign: 'justify',
    },
});
