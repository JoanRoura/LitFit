/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Routine } from '../interfaces/routineInterface';

const windowWidth = Dimensions.get('window').width;

interface Props {
    routine: Routine;
}

export const RoutineCard = ({ routine }: Props) => {

    const navigation = useNavigation<any>();


    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={ () =>
                navigation.navigate('RoutineDetailsScreen', routine) // TODO: Canviar per Routine
            }
        >
            <View style={{
                ...routineCardStyles.cardContainer,
                backgroundColor: 'white',
                width: windowWidth * 0.9,
            }}>

                {/* Nom del Pokemon i ID */}
                <View>
                    <Text style={ routineCardStyles.nameRoutine }>
                        { routine.name }
                    </Text>
                </View>

            </View>
        </TouchableOpacity>
    );
};

const routineCardStyles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 10,
        // backgroundColor: 'grey',
        height: 170,
        marginBottom: 15,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    nameRoutine: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        top: 20,
        left: 20,
    },
});
