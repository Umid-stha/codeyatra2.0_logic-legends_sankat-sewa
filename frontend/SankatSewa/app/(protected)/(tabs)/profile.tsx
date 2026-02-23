import Header from '@/components/Header';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'expo-router';
import { Text, View, StyleSheet, Pressable } from 'react-native';

export default function profile() {
  const {logout} = useAuth()
  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.text}>Profile </Text>
    <Link href='/login'>Login</Link>
    <Pressable onPress={logout}><Text>Logout</Text></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
  },
  text: {
    color: '#fff',
  },
});
