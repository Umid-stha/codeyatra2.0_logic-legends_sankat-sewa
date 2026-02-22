import MapScreen from '@/components/Map';
import { Text, View, StyleSheet } from 'react-native';

export default function profile() {
  return (
    <View style={styles.container}>
      <MapScreen />
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
