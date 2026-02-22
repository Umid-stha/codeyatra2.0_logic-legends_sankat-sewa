import { StyleSheet, View } from 'react-native';
import { Stack, Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import EvilIcons from '@expo/vector-icons/EvilIcons';

export default function TabLayout() {
  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#E53959',
          tabBarStyle: {
            backgroundColor: '#FFFFFF'
            ,
          }
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
            ),
          }}
        />
        <Tabs.Screen
          name="incident"
          options={{
            title: 'Incidents',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'alarm-sharp' : 'alarm-outline'} color={color} size={24} />
            )
          }} />

        <Tabs.Screen
          name="map"
          options={{
            title: 'map',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'location-sharp' : 'location-outline'} color={color} size={24} />
            )
          }}
        />

        <Tabs.Screen
          name="report"
          options={{
            title: 'Report',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'radio-sharp' : 'radio-outline'} color={color} size={24} />
            )
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'man-sharp' : 'man-outline'} color={color} size={24} />
            )
          }}
        />

      </Tabs>
    </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});