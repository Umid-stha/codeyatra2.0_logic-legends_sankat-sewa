import { Text, View, StyleSheet } from 'react-native';
import ImageViewer from '@/components/ImageViewer';
import Button from '@/components/Button';

const PlaceholderImage = require('@/assets/images/android-icon-background.png');

export default function Index() {
  return (
    <View style={styles.container}>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1/9,
    backgroundColor: '#bebebe',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius:9,
    borderColor: "red",
  },
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1/3,
    alignItems: 'center'
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  text: {
    color: '#fff',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});