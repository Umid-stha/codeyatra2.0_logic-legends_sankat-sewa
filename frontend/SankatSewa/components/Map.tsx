import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import * as Location from "expo-location";

interface Incident {
  id: number;
  title: string;
  latitude: number;
  longitude: number;
  status: string;
}

interface Coordinates {
  latitude: number;
  longitude: number;
}

export default function MapScreen() {
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);

  const incidents: Incident[] = [
    {
      id: 1,
      title: "Fire outbreak",
      latitude: 27.7175,
      longitude: 85.3240,
      status: "OPEN",
    },
    {
      id: 2,
      title: "Medical emergency",
      latitude: 27.7185,
      longitude: 85.3220,
      status: "OPEN",
    },
    {
      id: 3,
      title: "Road accident",
      latitude: 27.7160,
      longitude: 85.3235,
      status: "RESOLVED",
    },
  ];

  useEffect(() => {
    (async () => {
      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") return;

      const location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  const initialRegion: Region = {
    latitude: 27.7172,
    longitude: 85.3240,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        {/* Incident Markers */}
        {incidents.map((incident) => (
          <Marker
            key={incident.id}
            coordinate={{
              latitude: incident.latitude,
              longitude: incident.longitude,
            }}
            title={incident.title}
            pinColor={
                "red"
            }
          />
        ))}

        {/* User Marker */}
        {userLocation && (
          <Marker
            coordinate={userLocation}
            title="You"
            pinColor="blue"
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});