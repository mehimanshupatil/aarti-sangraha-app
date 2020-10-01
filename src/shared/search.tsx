import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { globalStyle } from '../shared/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { searchInput } from '../redux/action';

function Search({ setShowSearchInput, searchValue, searchInput }) {

    return (
        <View style={{ marginTop: 10, justifyContent: "center" }}>
            <TextInput
                style={styles.inputStyle}
                placeholder="Type here Search"
                placeholderTextColor="rgb(24,28,63)"
                autoFocus={true}
                onChangeText={text => searchInput(text)}
                value={searchValue}
            />
            <MaterialIcons name='close' onPress={() => { setShowSearchInput(false); searchInput("") }} size={28} style={styles.searchIcon} />
        </View>
    );
}


const styles = StyleSheet.create({
    inputStyle: {
        height: 40, borderRadius: 5, borderWidth: 1, textAlign: 'center',
        borderColor: 'rgb(24,28,63)',
        ...globalStyle.blueText
    },
    searchIcon: {
        position: 'absolute',
        right: 12,
        ...globalStyle.blueText

    },
});

const mapStateToProps = (state, ownProps) => {
    return {
        searchValue: state.searchValue
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        searchInput: (value) => dispatch(searchInput(value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
