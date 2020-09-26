import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import { globalStyle } from './styles';
import { connect } from 'react-redux';
import Search from './search';

function Header({ title, navigation, showSearchButton }) {

    const openMenu = () => {
        navigation.openDrawer();
    }

    const [showSearch, setLocalData] = useState(true)

    return (
        showSearch ?
            <View style={styles.header}>
                <MaterialIcons name='menu' size={28} onPress={openMenu} style={styles.menuIcon} />
                <View>
                    <Text style={styles.headerText}>{title}</Text>
                </View>
                {showSearchButton && <MaterialIcons name='search' onPress={() => setLocalData(!showSearch)} size={28} style={styles.searchIcon} />}
            </View>
            : <Search setShowSearchInput={() => setLocalData(!showSearch)} />


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

});

const mapStateToProps = (state, ownProps) => {
    return {
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)