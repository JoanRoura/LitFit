/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Routine } from '../interfaces/routineInterface';
import { appStyles } from '../theme/appTheme';
import { useExercisesByRoutine } from '../hooks/useExercisesByRoutine';
import { Image } from 'react-native-elements';

const windowWidth = Dimensions.get('window').width;

interface Props {
    routine: Routine;
}

export const RoutineCard = ({ routine }: Props) => {

    const navigation = useNavigation<any>();

    const { exercisesByRoutine } = useExercisesByRoutine(routine.id!);

    // const setsAvailable = sets?.length > 0;

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() =>
                navigation.navigate('RoutineDetailsScreen', routine)
            }
        >
            <View style={{
                ...routineCardStyles.cardContainer,
                width: windowWidth * 0.9,
                backgroundColor: 'white',
            }}>

                {/* Nom de la Routine i numero de exersis que te */}
                <View style={routineCardStyles.containerTopCard}>
                    <View style={routineCardStyles.nameConatainer}>
                        <Text
                            style={{
                                ...appStyles.text,
                                ...routineCardStyles.nameRoutine,
                            }}
                        >
                            {routine.name}
                        </Text>

                        <Text style={appStyles.text}>
                            {exercisesByRoutine.length} exercises
                        </Text>
                    </View>

                    <View style={routineCardStyles.containerImage}>
                        {routine.image && (
                            <Image
                                resizeMode="contain"
                                source={{ uri: routine.image }}
                                style={routineCardStyles.imageRoutine}
                            />
                        )}
                    </View>

                </View>

                {/* Exercisis de la rutina  */}
                {/* <View>
                    {exercisesByRoutine.slice(0, 3).map((exercise) => (
                        <Text
                            style={styles.text}
                            key={exercise.id}
                        >
                            {exercise.name} 4X8
                        </Text>
                    ))}
                </View> */}
                <View>
                    {exercisesByRoutine.slice(0, 4).map((exercise) => (
                        <View key={exercise.id} style={routineCardStyles.containerExercisesSets}>
                            <Text style={routineCardStyles.textNameExercise}>{exercise.name}</Text>
                            <View style={{ flex: 1 }} />
                            <Text style={routineCardStyles.textSets}>4x8</Text>
                        </View>
                    ))}
                </View>

                {/* Mostra les series per cada exercici */}
                {/* <View>
                    {setsAvailable && (
                        <View>
                            {sets.map((set: any, index: any) => (
                                <Text key={index} style={styles.text}>
                                    {`Set ${index + 1}: ${set.reps} reps`}
                                </Text>
                            ))}
                        </View>
                    )}
                </View> */}

                {/* <ExerciseList exercises={exercisesByRoutine} /> */}

            </View>
        </TouchableOpacity>
    );
};

const routineCardStyles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 10,
        // backgroundColor: 'grey',
        height: 200,
        marginBottom: 15,
        borderRadius: 10,
        backgroundColor: 'white',
        paddingVertical: 20,
        paddingHorizontal: 15,
    },
    containerTopCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    containerImage: {
        width: 60,
        height: 60,
    },
    imageRoutine: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
    },
    nameConatainer: {
        marginBottom: 18,
    },
    nameRoutine: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    containerExercisesSets: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 6,
    },
    textNameExercise: {
        color: '#000',
    },
    textSets: {
        color: '#000',
        fontWeight: 'bold',
    },
});
