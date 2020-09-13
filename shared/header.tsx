import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Header({ title, navigation, showSearchButton }) {

    const openMenu = () => {
        navigation.openDrawer();
    }

    return (
        <View style={styles.header}>
            <MaterialIcons name='menu' size={28} onPress={openMenu} style={styles.menuIcon} />
            <View>
                <Text style={styles.headerText}>{title}</Text>
            </View>
            {showSearchButton && <MaterialIcons name='search' size={28} style={styles.searchIcon} />}
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
        color: '#1c3f18',
        letterSpacing: 1,
    },
    menuIcon: {
        position: 'absolute',
        left: 12,
    },
    searchIcon: {
        position: 'absolute',
        right: 12,
    }
});