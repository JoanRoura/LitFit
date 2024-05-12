import React, { useState } from 'react';
import { Image, Modal, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Exercise } from '../interfaces/exerciseInterface';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { ExerciseDetails } from './ExerciseDetails';

interface Props {
    exercise: Exercise;
}

export const ExerciseCard = ({ exercise }: Props) => {

    const navigation = useNavigation<any>();

    const [bgModalName, setBgModalName] = useState(false);

    const [modalExercisesVisible, setModalExercisesVisible] = useState(false);

    return (
        <View>
            <TouchableOpacity
                activeOpacity={0.7}
                style={exerciseCardStyles.container}
                // onPress={() => navigation.navigate('ExerciseDetailScreen', exercise)}
                onPress={() => setModalExercisesVisible(true)}
            >
                <View style={exerciseCardStyles.containerImage}>
                    {exercise.image && (
                        <Image
                            resizeMode="contain"
                            source={{ uri: exercise.image }}
                            style={exerciseCardStyles.imageExercise}
                        />
                    )}
                </View>

                <View style={exerciseCardStyles.containerInfoExercise}>
                    <Text style={exerciseCardStyles.textNameExercise}>{exercise.name}</Text>

                    <Text style={exerciseCardStyles.textSetsExercise}>4 sets x 8 reps</Text>
                </View>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalExercisesVisible}
                onRequestClose={() => {
                    setModalExercisesVisible(!modalExercisesVisible);
                }}
            >
                <TouchableWithoutFeedback onPress={() => setBgModalName(false)}>

                    <View style={exerciseCardStyles.fullScreenOverlay}>
                        <View style={exerciseCardStyles.modalExercisesView}>
                            <ExerciseDetails exercise={exercise} />
                        </View>
                    </View>

                </TouchableWithoutFeedback>
            </Modal>
        </View>
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

    fullScreenOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalExercisesView: {
        flex: 1,
        marginTop: 50,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: "#e1e1e1",
        overflow: 'hidden',
    },
});
