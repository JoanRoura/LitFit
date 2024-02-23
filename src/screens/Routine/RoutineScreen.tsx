/* eslint-disable react-native/no-inline-styles */

import 'react-native-url-polyfill/auto';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useRoutines } from '../../hooks/useRoutines';
import { styles } from '../../theme/appTheme';
import { RoutineCard } from '../../components/RoutineCard';


export const RoutineScreen = () => {

    const { top } = useSafeAreaInsets();

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

    const { routines } = useRoutines();

    return (
        <>
            <View
                style={ routineStyles.container }
            >
                {/* Mostrem el llistat de les rutines, i a la vegada fem un 'Infinite Scroll' */}
                <FlatList
                    data={routines}
                    keyExtractor={(routine) => routine.id.toString()}
                    showsVerticalScrollIndicator={false}

                    // * Header del FlatList
                    ListHeaderComponent={(
                        <Text
                            style={{
                                ...styles.title,
                                ...styles.glovalMargin,
                                top: top + 20,
                                marginBottom: top + 20,
                                paddingBottom: 15,
                            }}
                        >
                            ROUTINES
                        </Text>
                    )}

                    renderItem={({ item }) => <RoutineCard routine={ item } />}

                    // * Configuracio del 'Infinite Scroll'
                    //   onEndReached={ loadPokemons }
                    //   onEndReachedThreshold={ 0.4 }

                    // * Implementacio de '<ActivityIndicator>' mentres es carrgant els proxim
                    // ListFooterComponent={(
                    //     <ActivityIndicator
                    //         style={{ height: 100 }}
                    //         size={20}
                    //         color="grey"
                    //     />
                    // )}
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
