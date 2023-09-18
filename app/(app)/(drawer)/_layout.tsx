import { Stack } from 'expo-router';
import React from 'react';
import Header from '../../../components/Header';

export default function RootLayout() {

    return (
        <Stack>
            <Stack.Screen
                name="(home)"
                options={{
                    title: 'Home Screen',
                    header: ({ navigation }) => <Header title='आरती संग्रह' navigation={navigation} showSearchButton />,
                }}
            />
            <Stack.Screen name='aarti-view/[slug]' />
            <Stack.Screen name='add-aarti/[key]' />
        </Stack>

    );
}
