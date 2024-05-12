import React from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { FlatListMenuItem } from '../../components/FlatListMenuItem';
import { ItemSeparator } from '../../components/ItemSeparator';
import { menuItems } from '../../data/menuItems';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../../context/authContext/AuthContext';
import { supabase } from '../../database/supabase';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export const ProfileScreen = () => {
    const navigation = useNavigation<any>();
    const { top } = useSafeAreaInsets();
    const { user } = useAuth();

    return (
        <View
            style={{
                ...styles.container,
                marginBottom: (Platform.OS === 'ios') ? 80 : 60,
            }}
        >
            <Text style={{
                ...styles.titleScreen,
                top: top + 15,
                marginBottom: top + 15,
                paddingBottom: 15,
            }}>
                WELCOME, {user?.email}
            </Text>

            <View style={styles.containerMenu}>
                <FlatList
                    data={menuItems}
                    renderItem={({ item }) => <FlatListMenuItem menuItem={item} />}
                    keyExtractor={item => item.name}
                    ItemSeparatorComponent={() => <ItemSeparator />}

                    ListHeaderComponent={
                        <View style={{ paddingBottom: 16 }}>
                            <Text
                                style={{
                                    fontSize: 20,
                                    color: '#000',
                                    fontWeight: 'bold'
                                }}>
                                Settings
                            </Text>
                        </View>
                    }

                    ListFooterComponent={
                        <View>
                            <ItemSeparator />
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => {
                                    supabase.auth.signOut();
                                    navigation.navigate('LoginScreen');
                                }}>
                                <View style={styles.btnSignOut}>
                                    <Icon name='log-out-outline' color='#000' size={23} />

                                    <Text
                                        style={{
                                            ...styles.itemText,
                                            color: '#000'
                                        }}>
                                        Sign Out
                                    </Text>

                                    <View style={{ flex: 1 }} />

                                    <Icon name="chevron-forward-outline" color='#000' size={20} />
                                </View>
                            </TouchableOpacity>

                        </View>
                    }
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        gap: 10,
    },
    titleScreen: {
        alignSelf: 'flex-start',
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
    },
    containerMenu: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
    },
    btnSignOut: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    itemText: {
        marginLeft: 10,
        fontSize: 16,
    },

});
