import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import SingleItem from '../components/singleItem';
import { ShowHideSearchBar } from '../redux/action';
import Search from '../shared/search';
import { globalStyle } from '../shared/styles';

function Favorites({ navigation, aartis, ShowHideSearchBar, showSearch }) {
    const pressHandler = (item) => {
        navigation.push('CommonComponent', {
            data: item
        });
    };

    const [localData, setLocalData] = useState([])
    const [text, setText] = useState('')

    useEffect(() => {
        setLocalData(aartis.filter((x: any) => x.favorite && (x.title.includes(text) || x.body.includes(text))))
    }, [aartis, text])

    return (
        <View style={globalStyle.homeRoot}>
            <View style={globalStyle.homecontainer}>
                {showSearch && <Search text={text} setText={setText} setShowSearchInput={ShowHideSearchBar} />}
                {localData?.length ? <FlatList
                    data={localData}
                    renderItem={({ item, index }) => (
                        <SingleItem index={index} item={item} pressHandler={pressHandler} />
                    )}
                    showsVerticalScrollIndicator={false}
                /> :
                    <Text style={styles.text}>No Favorites Found.</Text>}
            </View>
        </View>
    );
}


const mapStateToProps = (state, ownProps) => {
    return {
        aartis: state.aartis,
        showSearch: state.showSearch
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ShowHideSearchBar: (value) => dispatch(ShowHideSearchBar(value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites)

const styles = StyleSheet.create({
    text: {
        padding: 20,
        fontWeight: 'bold',
        fontSize: 20,
        color: 'rgb(255,224,101)'
    }
});
