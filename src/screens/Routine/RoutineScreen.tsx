/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable react-native/no-inline-styles */
import 'react-native-url-polyfill/auto';
import React, { useEffect } from 'react';
import { Button, FlatList, Platform, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useRoutines } from '../../hooks/useRoutines';
import { appStyles } from '../../theme/appTheme';
import { RoutineCard } from '../../components/RoutineCard';

export const RoutineScreen = () => {

    const { top } = useSafeAreaInsets();

    // ? Insercio dels exercicis de una API rest a la meva DB
    // const postExercises = async () => {
    //     try {
    //         const exercisesWithId = exercises.map((ex, i) => {
    //             // Elimina los campos no deseados
    //             const { 'Beginner Sets': _, 'Intermediate Sets': __, 'Expert Sets': ___, ...rest } = ex;

    //             // Mapea los nombres de campo según tus requisitos
    //             const newExercise: Exercise = {
    //                 // id: i + 1, // Asigna un id aleatorio o según tu lógica
    //                 name: rest.WorkOut,
    //                 desc: rest.Explaination,
    //                 longDesc: rest['Long Explanation'],
    //                 muscle: rest.Muscles as MuscleType, // Asegúrate de que coincida con los tipos definidos en la interfaz
    //                 equipment: rest.Equipment,
    //                 video: rest.Video,
    //                 intensityLevel: rest.Intensity_Level as IntensityLevelType, // Asegúrate de que coincida con los tipos definidos en la interfaz
    //             };

    //             return newExercise;
    //         });

    //         // Ejecuta la inserción y captura la respuesta
    //         const { data, error } = await supabase.from('exercises').insert(exercisesWithId).select();


    //         if (error) {
    //             console.error('Error al insertar los registros:', error);
    //         } else {
    //             console.log('Registros insertados correctamente:', data);
    //         }
    //     } catch (error) {
    //         console.error('Error general:', error);
    //     }
    // };

    // ? Conexio a la base de dades directament amb els metodes que et proporciona supabase
    // const fetchUsersData = async () => {
    //     try {
    //         const { data, error } = await supabase
    //             .from('users') // Nombre de la tabla
    //             .select('*');  // Selecciona todas las columnas, puedes ajustar esto según tus necesidades

    //         if (error) {
    //             console.error('Error fetching users data:', error.message);
    //         } else {
    //             console.log('Users data:', data);
    //             // Aquí puedes manejar los datos, como almacenarlos en el estado de tu componente
    //             // setState({ usersData: data });
    //         }
    //     } catch (error: any) {
    //         console.error('Error in fetchUsersData:', error.message);
    //     }
    // };

    // ? Conexio a la base de dades, fent us de axios (una request HTTP)
    // const fetchUsersData = async () => {
    //     try {
    //         const response = await fetch(
    //             'https://suihadhlsajlenuxneix.supabase.co/rest/v1/users?select=*',
    //             {
    //                 method: 'GET',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1aWhhZGhsc2FqbGVudXhuZWl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4MDU3MjIsImV4cCI6MjAyMjM4MTcyMn0.gIbJ1Nz1mgLAOaTTKuhSnC9NgZQh0ol8UHyeuoNrj_c',
    //                 },
    //             }
    //         );

    //         if (!response.ok) {
    //             throw new Error(`HTTP error! Status: ${response.status}`);
    //         }

    //         const data = await response.json();
    //         console.log('Users data:', data);
    //         // Aquí puedes manejar los datos, como almacenarlos en el estado de tu componente
    //         // setState({ usersData: data });
    //     } catch (error: any) {
    //         console.error('Error fetching users data:', error.message);
    //     }
    // };

    // useEffect(() => {
    //     fetchUsersData();
    // }, []);

    const { defaultRoutines } = useRoutines();

    return (
        <>
            <View
                style={{
                    ...routineStyles.container,
                    marginBottom: (Platform.OS === 'ios') ? 80 : 60,
                }}
            >
                <FlatList
                    data={defaultRoutines}
                    keyExtractor={(routine) => routine.id.toString()}
                    showsVerticalScrollIndicator={false}

                    // * Header del FlatList
                    ListHeaderComponent={(
                        <Text
                            style={{
                                ...appStyles.title,
                                ...appStyles.glovalMargin,
                                top: top + 15,
                                marginBottom: top + 15,
                                paddingBottom: 15,
                            }}
                        >
                            ROUTINES
                        </Text>
                    )}

                    renderItem={({ item }) => <RoutineCard routine={item} />}
                />
            </View>
        </>
    );
};

const routineStyles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
});
