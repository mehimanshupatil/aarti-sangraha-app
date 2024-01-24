import { Drawer } from 'expo-router/drawer';
import React from 'react';
import Header from '../../components/Header';
import { useAppTheme } from '../../shared/types';
import CustomSidebarMenu from '../../components/CustomSidebarMenu';
import { IconButton } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export default function RootLayout2() {
    const { colors } = useAppTheme();
    return (
        <Drawer
            screenOptions={{
                drawerStyle: {
                    backgroundColor: colors.background,
                    width: '60%',
                },
                drawerInactiveTintColor: colors.primary,
            }}
            drawerContent={(props) => <CustomSidebarMenu {...props} />}

        >
            <Drawer.Screen
                name="(drawer)"
                options={{
                    headerShown: false,
                    drawerLabel: 'Home',
                    drawerIcon: () => (
                        <IconButton iconColor={colors.primary} style={styles.drawerIcon} icon='home' size={28} />
                    ),
                }}
            />
            <Drawer.Screen
                options={{
                    header: ({ navigation }) => (
                        <Header title='About' navigation={navigation} showSearchButton={false} />
                    ),
                    drawerLabel: 'About',
                    drawerIcon: () => (
                        <IconButton
                            iconColor={colors.primary}
                            style={styles.drawerIcon}
                            icon='information'
                            size={28}
                        />
                    ),
                }}
                name='about'
            />
              <Drawer.Screen
                options={{
                    header: ({ navigation }) => (
                        <Header title='Setting' navigation={navigation} showSearchButton={false} />
                    ),
                    drawerLabel: 'Setting',
                    drawerIcon: () => (
                        <IconButton
                            iconColor={colors.primary}
                            style={styles.drawerIcon}
                            icon='nut'
                            size={28}
                        />
                    ),
                }}
                name='setting'
            />
        </Drawer>
    );
}


const styles = StyleSheet.create({
    drawerIcon: {
        margin: 0,
    },
});