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
        ,}
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
       options={{title:'Incidents',
        tabBarIcon: ({color, focused}) =>(
          <Ionicons name={focused ? 'alarm-sharp' : 'alarm-outline'} color={color} size={24}/>
        )
       }}/>

         <Tabs.Screen
        name="map"
        options={{
          title: 'map',
          tabBarIcon: ({ color, focused }) => (
            <Feather name="map-pin" size={24} color="white" />          ),
        }}
      />

       <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
          <EvilIcons name="user" size={24} color="black" />          ),
        }}
      />
             <Tabs.Screen
        name="report"
        options={{
          title: 'Report',
          tabBarIcon: ({ color, focused }) => (
          <EvilIcons name="exclamation" size={24} color="white" />          ),
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