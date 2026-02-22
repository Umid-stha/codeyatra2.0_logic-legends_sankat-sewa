import { Stack, Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import EvilIcons from '@expo/vector-icons/EvilIcons';
export default function TabLayout() {
  return (
   <>
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ffd33d',
        headerStyle: {
            backgroundColor: '#25292e',
        },
        headerShadowVisible: false,
        headerTintColor: '#fff',
        tabBarStyle: {
            backgroundColor: '#25292e'
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={24}/>
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
    
    </Tabs>
   
   </>
    
  );
}