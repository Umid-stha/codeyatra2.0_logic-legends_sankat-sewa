import Header from '@/components/Header';
import { Text, View, StyleSheet } from 'react-native';

export default function profile() {
  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.text}>Profile </Text>
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
