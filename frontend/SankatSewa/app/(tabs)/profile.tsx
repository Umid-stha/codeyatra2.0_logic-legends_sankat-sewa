import Header from '@/components/Header';
import { Link } from 'expo-router';
import { Text, View, StyleSheet } from 'react-native';

export default function profile() {
  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.text}>Profile </Text>
    <Link href='/login'>Login</Link>
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
