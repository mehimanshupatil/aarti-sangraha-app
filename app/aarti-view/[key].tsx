import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    Alert,
    ToastAndroid,
} from "react-native";
import { useKeepAwake } from "expo-keep-awake";
import { commmonTempNav, singleItemType, useAppTheme } from "../../src/shared/types";
import { IconButton } from "react-native-paper";
import { useDataStore } from '../../src/store/store';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { onShare } from '../../src/routes/HomeStack';

const CommonTemplate: React.FC<commmonTempNav> = () => {

    const { key } = useLocalSearchParams();
    useKeepAwake();

    const { colors } = useAppTheme();
    const [aartis, fontSize] = useDataStore(s => [s.aartis, s.fontSize])
    const [setFontSize, toggleFav, deleteAarti] = useDataStore(s => [s.setFontSize, s.toggleFav, s.deleteAarti])

    const [selectedItem, setSelectedItem] = useState(
        aartis.find((x) => x.key == key)
    );
    useEffect(() => {
        const single = aartis.find((x) => x.key == key);
        setSelectedItem(single);
    }, [aartis]);

    const deletePress = () => {
        Alert.alert(
            "Alert",
            `Are you sure you want to delete ${selectedItem?.title}. This action cannot be undone`,
            [
                {
                    text: "रद्द करा",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                },
                {
                    text: "ठीक आहे",
                    onPress: () => {
                        deleteAarti((selectedItem?.key ?? 0).toString());
                        ToastAndroid.show("यशस्वीरित्या हटविले", ToastAndroid.SHORT);
                        router.back();
                    },
                },
            ]
        );
    };

    const iconPress = (
        item: singleItemType | undefined
    ) => {
        if (!item) return;

        ToastAndroid.show(
            !item.isFavorite ? "Added to Favorites" : "Removed from Favorites",
            ToastAndroid.SHORT
        );
        
        toggleFav(item.key);
    };

    const addNew = () => {
        if (!selectedItem) return;
        router.push(`/add-aarti/${key}`);
       
    };

    return (
        <View
            style={{
                ...styles.container,
                backgroundColor: colors.background,
                paddingTop: 5,
            }}
        >
            <Stack.Screen
                options={{
                    title: selectedItem?.title,
                    headerRight: () => (
                        <IconButton
                            icon='share-variant'
                            size={24}
                            iconColor={colors.background}
                            style={{ marginRight: 10 }}
                            onPress={() =>
                                onShare(aartis.find((x) => x.key === key))
                            }
                        />
                    ),
                    headerTitleStyle: {
                        color: colors.background,
                    },
                    headerTintColor: colors.background,
                    headerStyle: {
                        backgroundColor: colors.text
                    }
                }}
            />
            <View style={styles.buttonContainer}>
                <View style={styles.fontButton}>
                    <IconButton
                        icon={selectedItem?.isFavorite ? "heart" : "heart-outline"}
                        size={30}
                        style={styles.unsetbuttonStyle}
                        iconColor={colors.primary}
                        onPress={() => iconPress(selectedItem)}
                    />
                    {selectedItem?.isRemovable && (
                        <IconButton
                            icon="delete-forever"
                            size={30}
                            style={styles.unsetbuttonStyle}
                            iconColor={colors.primary}
                            onPress={deletePress}
                        />
                    )}
                </View>
                <View style={[styles.fontButton, { alignItems: "center" }]}>
                    <Text style={{ color: colors.primary, fontSize: 25 }}>
                        {selectedItem?.key}
                    </Text>
                    {selectedItem?.isRemovable && (
                        <IconButton
                            icon="file-document-edit-outline"
                            size={30}
                            style={styles.unsetbuttonStyle}
                            iconColor={colors.primary}
                            onPress={addNew}
                        />
                    )}
                </View>
                <View style={styles.fontButton}>
                    <IconButton
                        icon="plus-circle"
                        size={30}
                        style={styles.unsetbuttonStyle}
                        iconColor={colors.primary}
                        onPress={() => {
                            if (fontSize < 40) {
                                setFontSize(fontSize + 3);
                            }
                        }}
                    />

                    <IconButton
                        icon="minus-circle"
                        size={30}
                        style={styles.unsetbuttonStyle}
                        iconColor={colors.primary}
                        onPress={() => {
                            if (fontSize > 15) {
                                setFontSize(fontSize - 3);
                            }
                        }}
                    />
                </View>
            </View>
            <ScrollView>
                <Text style={{ color: colors.primary, fontSize: fontSize }}>
                    {selectedItem?.body}
                </Text>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    fontButton: {
        flexDirection: "row",
    },
    unsetbuttonStyle: {
        margin: 0,
    },
});

export default CommonTemplate;
