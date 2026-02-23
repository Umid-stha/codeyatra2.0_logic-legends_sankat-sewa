import React, { useEffect, useState, SetStateAction } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker, MapPressEvent } from "react-native-maps";
import * as Location from "expo-location";

interface LocationPickerProps {
  onLocationSelect: (data: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
  setLocationModal: React.Dispatch<SetStateAction<boolean>>
}

export default function LocationPicker({
  onLocationSelect,
  setLocationModal
}: LocationPickerProps) {
  const [region, setRegion] = useState<any>(null);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      const location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  const handleMapPress = async (event: MapPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;

    setSelectedLocation({ latitude, longitude });

    const reverseGeocode = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    const formattedAddress = reverseGeocode[0]
      ? `${reverseGeocode[0].name || ""}, ${
          reverseGeocode[0].city || ""
        }, ${reverseGeocode[0].region || ""}`
      : "Unknown location";

    setAddress(formattedAddress);
  };

  const confirmLocation = () => {
    if (!selectedLocation) {
        setLocationModal(false)
        return;
    }

    onLocationSelect({
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
      address,
    });
    setLocationModal(false)
  };

  if (!region) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={region}
        onPress={handleMapPress}
      >
        {selectedLocation && (
          <Marker coordinate={selectedLocation} />
        )}
      </MapView>

      <View style={styles.infoBox}>
        <Text style={styles.addressText}>
          {address || "Tap on map to select location"}
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={confirmLocation}
          disabled={!selectedLocation}
        >
          <Text style={styles.buttonText}>Confirm Location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  infoBox: {
    padding: 16,
    backgroundColor: "#fff",
  },
  addressText: {
    marginBottom: 10,
    fontSize: 14,
  },
  button: {
    backgroundColor: "#E53959",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});