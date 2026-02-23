import { StyleSheet, View } from 'react-native';
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
    return (
        <View style={styles.container}>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: '#E53959',
                    tabBarStyle: {
                        backgroundColor: '#FFFFFF',
                    },
                    headerShown: false,
                }}
            >
                <Tabs.Screen
                    name="login"
                    options={{
                        title: 'Login',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
                        ),
                    }}
                />

            </Tabs>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});