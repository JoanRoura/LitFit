/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SearchInput } from '../../components/SearchInput';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Exercise } from '../../interfaces/exerciseInterface';
import { useExercise } from '../../hooks/useExercise';
import { ExerciseCard } from '../../components/ExerciseCard';
import { Loading } from '../../components/Loading';
import { appStyles } from '../../theme/appTheme';

export const ExerciseScreen = () => {
    const {top} = useSafeAreaInsets();

    const {isLoading, exercises} = useExercise();

    const [exercisesFiltered, setExercisesFiltered] = useState<Exercise[]>([]);

    const [term, setTerm] = useState('');

    useEffect(() => {

        if (term.length === 0) {
            return setExercisesFiltered([]);
        }

        if (isNaN(Number(term))) {
            setExercisesFiltered(
                exercises.filter(
                    (exercise) => exercise.name.toLowerCase()
                        .includes(term.toLowerCase())
                )
            );
        }
    }, [term]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <View style={exerciseStyles.container}>

            <View style={exerciseStyles.inputContainer}>
                <Text
                    style={{
                        ...appStyles.title,
                        top: top + 15,
                    }}
                >
                    EXERCISES
                </Text>

                <SearchInput
                    onDebounce={(value) => setTerm(value)}
                    style={{}}
                />
            </View>


            <FlatList
                data={exercisesFiltered}
                keyExtractor={(exercise) => exercise.id!.toString()}
                showsVerticalScrollIndicator={false}
                numColumns={1}
                renderItem={({ item }) => <ExerciseCard exercise={item} />}
            />

        </View>
    );
};

const exerciseStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        gap: 24,
    },
    inputContainer: {
        display: 'flex',
        gap: 24,
    },
    term: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingBottom: 10,
    },
});

