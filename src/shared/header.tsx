import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import { globalStyle } from './styles';

export default function Header({ title, navigation, showSearchButton, searchInput, textColor }) {
    const [showSearchInput, setShowSearchInput] = useState(false)
    const [text, setText] = useState('')

    const onChange = (text: string) => {
        setText(text)
        searchInput(text)
    }

    const openMenu = () => {
        navigation.openDrawer();
    }
    return (
        (!showSearchInput && !text) ?
            <View style={styles.header}>
                <MaterialIcons name='menu' size={28} onPress={openMenu} style={{ ...styles.menuIcon, ...textColor }} />
                <View>
                    <Text style={{ ...styles.headerText, ...textColor }}>{title}</Text>
                </View>
                {showSearchButton && <MaterialIcons name='search' onPress={() => setShowSearchInput(true)} size={28} style={{ ...styles.searchIcon, ...textColor }} />}
            </View> :
            <View style={styles.header}>
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Type here Search"
                    placeholderTextColor="rgb(24,28,63)"
                    autoFocus={true}
                    onChangeText={text => onChange(text)}
                    defaultValue={text} />
                <MaterialIcons name='close' onPress={() => { setShowSearchInput(false); onChange("") }} size={28} style={styles.searchIcon} />
            </View>

    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'rgb(24,28,63)',
        letterSpacing: 1,
    },
    menuIcon: {
        position: 'absolute',
        left: 12,
        color: 'rgb(24,28,63)',
    },
    searchIcon: {
        position: 'absolute',
        right: 12,
        color: 'rgb(24,28,63)',

    },
    inputStyle: {
        height: 40, flex: 1, borderRadius: 5, borderWidth: 1, textAlign: 'center',
        borderColor: 'rgb(24,28,63)',
        ...globalStyle.blueText
    }
});