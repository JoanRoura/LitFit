/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Platform, StyleProp, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDebouncedValue } from '../hooks/useDebouncedValue';

interface Props {
    onDebounce: ( value: string ) => void,
    style?: StyleProp<ViewStyle>;
}

export const SearchInput = ({ style, onDebounce }: Props) => {

    const [ textValue, setTextValue ] = useState('');

    const debouncedValue = useDebouncedValue( textValue );

    useEffect(() => {
        onDebounce(debouncedValue);
    }, [debouncedValue]);

    return (
        <View style={{
            ...styles.container,
            ...style as any,
        }}>
            <View style={styles.textBackground}>
                <Icon
                    name="search-outline"
                    color="grey"
                    size={20}
                />

                <TextInput
                    placeholder="Search exercises"
                    style={{
                        ...styles.textInput,
                        top: (Platform.OS === 'ios') ? 0 : 2,
                    }}
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={ textValue }
                    onChangeText={ setTextValue }
                />
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'red',
    },
    textBackground: {
        backgroundColor: '#fff',
        borderRadius: 50,
        height: 40,
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        paddingLeft: 8,
        marginBottom: 1,
    },
});
