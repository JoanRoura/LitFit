/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Routine } from '../interfaces/routineInterface';
import { useExercise } from '../hooks/useExercise';
import { styles } from '../theme/appTheme';

const windowWidth = Dimensions.get('window').width;

interface Props {
    routine: Routine;
}

export const RoutineCard = ({ routine }: Props) => {

    const navigation = useNavigation<any>();

    const { exercisesByRoutine } = useExercise(routine.id);

    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={() =>
                navigation.navigate('RoutineDetailsScreen', routine) // TODO: Canviar per Routine
            }
        >
            <View style={{
                ...routineCardStyles.cardContainer,
                width: windowWidth * 0.9,
                backgroundColor: 'white',
            }}>

                {/* Nom de la Routine i numero de exersis que te */}
                <View style={routineCardStyles.nameConatainer}>
                    <Text
                        style={{
                            ...styles.text,
                            ...routineCardStyles.nameRoutine,
                        }}
                    >
                        {routine.name}
                    </Text>

                    <Text style={styles.text}>
                        {exercisesByRoutine.length} exercises
                    </Text>
                </View>

                <View>
                    {exercisesByRoutine.slice(0, 3).map((exercise) => (
                        <Text
                            style={styles.text}
                            key={exercise.id}
                        >
                            {exercise.name}
                        </Text>
                    ))}
                </View>

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

    nameConatainer: {
        backgroundColor: 'red',
        marginBottom: 20,
        // flexDirection: 'row',
    },
    nameRoutine: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
