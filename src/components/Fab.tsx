import React from 'react';
import { StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


interface Props {
    title?: string;
    icon?: string;
    position?: 'br' | 'bl';
    onPress: () => void;
}

export const Fab = ({ title, icon, onPress, position = 'br' }: Props) => {

    const content = () => {
        if (icon) {
            return <Icon color={'white'} size={25} name={icon} />;
        } else if (title) {
            return <Text style={styles.fabText}>{title}</Text>;
        }
    };

    const ios = () => {
        return (
            <TouchableOpacity
                onPress={onPress}
                activeOpacity={0.7}
                style={[
                    styles.fabLocation,
                    (position === 'bl') ? styles.left : styles.right,
                ]}>

                <View style={styles.fab}>
                    {content()}
                </View>

            </TouchableOpacity>
        );
    };

    const android = () => {
        return (
            <View
                style={[
                    styles.fabLocation,
                    (position === 'bl') ? styles.left : styles.right,
                ]}>
                {/* Em de fer servir el 'TouchableNativeFeedback', per que el sombrejat en Android es vegi be */}
                <TouchableNativeFeedback
                    onPress={onPress}
                    // * Apliquem estils al sombrejat:
                    background={TouchableNativeFeedback.Ripple('#28425B', false, 30)}
                >
                    <View style={styles.fab}>
                        {content()}
                    </View>

                </TouchableNativeFeedback>
            </View>
        );
    };

    return (Platform.OS === 'ios') ? ios() : android();
};

const styles = StyleSheet.create({
    fabLocation: {
        position: 'absolute',
        bottom: 20,
    },
    right: {
        right: 25,
    },
    left: {
        left: 25,
    },
    fab: {
        backgroundColor: '#1E3FC9',
        width: 60,
        height: 60,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fabText: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
});
