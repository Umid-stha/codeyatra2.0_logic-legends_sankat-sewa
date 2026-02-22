import { useLocation } from '@/context/LocationContext'
import { View, Image, StyleSheet, Text} from 'react-native'

export default function MapPreview() {
    // const {location} = useLocation()
    const lat = 27.7172;
    const lng = 85.3240;
    const location = {
        latitude: lat,
        longitude: lng,
    }

    
    const staticMap = `https://maps.googleapis.com/maps/api/staticmap?center=${location?.latitude},${location?.longitude}&zoom=14&size=600x300&markers=color:red%7C${location?.latitude},${location?.longitude}&key=YOUR_API_KEY`;


  return (
      <View style={styles.mapContainer}>
        <Text>{staticMap}</Text>
        <Image source={{ uri: staticMap }} style={styles.mapImage} />
      </View>
)
}

const styles = StyleSheet.create({
  mapContainer: {
    height: 120,
    backgroundColor: '#E8EAED',
    borderRadius: 12,
    marginBottom: 14,
    overflow: 'hidden',
    position: 'relative',
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
})

