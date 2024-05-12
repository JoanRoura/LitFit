import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Exercise } from '../interfaces/exerciseInterface';

interface Props {
    exercise: Exercise;
}

export const ExerciseDetails = ({ exercise }: Props) => {

    const { top } = useSafeAreaInsets();

    return (
        // TODO: Canviar a ScrollView
        <View
            style={{
                ...styles.container,
                paddingTop: top + 15,
            }}
        >
            <Text style={styles.title}>INSTRUCTIONS</Text>

            <View style={styles.containerImage}>
                <Image
                    resizeMode="stretch"
                    source={{ uri: exercise.image! }}
                    style={styles.imageExercise}
                />
            </View>

            <View style={styles.containerDetailsExercise}>
                <Text style={styles.subTitle}>
                    {exercise.name}
                </Text>

                <View style={styles.containerEquipamentExercise}>
                    <View style={styles.spacerDetailExercise}>
                        <Text style={styles.titleDetailExercise}>FOCUS AREA</Text>
                        <Text style={styles.textDetailExercise}>{exercise.muscle}</Text>
                    </View>

                    <View style={styles.spacerDetailExercise}>
                        <Text style={styles.titleDetailExercise}>EQUIPMENT</Text>
                        <Text style={styles.textDetailExercise}>{exercise.equipment}</Text>
                    </View>

                    <View style={styles.spacerDetailExercise}>
                        <Text style={styles.titleDetailExercise}>INTENSITY LEVEL</Text>
                        <Text style={styles.textDetailExercise}>{exercise.intensity_level}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.line} />

            <View>
                <Text style={styles.subTitle}>
                    DESCRIPTION
                </Text>

                <Text style={styles.descExercise}>
                    {exercise.desc}
                </Text>
            </View>

            <View>
                <Text style={styles.subTitle}>
                    LONG EXPLANATION
                </Text>

                <Text style={styles.descExercise}>
                    {exercise.long_desc}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        paddingHorizontal: 20,
        gap: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        color: '#000',
        fontWeight: 'bold',
    },
    containerImage: {
        width: '100%',
        aspectRatio: 16 / 9,
    },
    imageExercise: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
    },
    containerDetailsExercise: {
        gap: 12,
    },
    subTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    containerEquipamentExercise: {
        gap: 6,
    },
    spacerDetailExercise: {
        flexDirection: 'row',
        gap: 10,
    },
    titleDetailExercise: {
        color: '#000',
        fontWeight: '600',
    },
    textDetailExercise: {
        color: '#000',
    },
    line: {
        borderBottomColor: 'black',
        borderBottomWidth: 0.3,
        opacity: 0.1,
    },
    descExercise: {
        color: '#000',
        padding: 10,
    }
});
