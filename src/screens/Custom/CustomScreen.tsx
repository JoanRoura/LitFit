import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, FlatList, RefreshControl } from 'react-native';
import { Fab } from '../../components/Fab';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCustomRoutine } from '../../hooks/useCustomRoutine';
import { RoutineCard } from '../../components/RoutineCard';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/authContext/AuthContext';

export const CustomScreen = () => {
    const { top } = useSafeAreaInsets();

    const [refreshing, setRefreshing] = useState(false);

    const navigation = useNavigation<any>();

    const { user } = useAuth();

    const { getCustomRoutines, customRoutines } = useCustomRoutine(user ? user.id : '');

    const onRefresh = async () => {
        await getCustomRoutines();
        setRefreshing(false);
    };

    return (
        <View style={{
            ...styles.container,
            marginBottom: (Platform.OS === 'ios') ? 80 : 60,
        }}>
            <Text style={{
                ...styles.titleScreen,
                top: top + 15,
                marginBottom: top + 15,
                paddingBottom: 15,
            }}>
                CUSTOM
            </Text>

            <FlatList
                data={customRoutines}
                keyExtractor={(routine) => routine.id!.toString()}
                showsVerticalScrollIndicator={false}

                renderItem={({ item }) => <RoutineCard routine={item} />}

                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        progressViewOffset={10}
                        colors={['#1E3FC9']}
                    />
                }

                // * Configuracio del 'Infinite Scroll'
                onEndReached={getCustomRoutines}
                onEndReachedThreshold={0.1}
            />

            <Fab
                icon='add-outline'
                onPress={() => { navigation.navigate('NewCustomRoutine') }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    titleScreen: {
        alignSelf: 'flex-start',
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        paddingHorizontal: 22,
    }
});

