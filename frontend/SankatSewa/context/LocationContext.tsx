import React, { createContext, useContext, useEffect, useState } from "react";
import * as Location from "expo-location";

interface Coordinates {
    latitude: number;
    longitude: number;
}

interface Address {
    city?: string;
    country?: string;
    street?: string;
}

interface LocationContextType {
    location: Coordinates | null;
    address: Address | null;
    loading: boolean;
}

const LocationContext = createContext<LocationContextType | undefined>(
    undefined
);

export const LocationProvider = ({ children }: { children: React.ReactNode }) => {
    const [location, setLocation] = useState<Coordinates | null>(null);
    const [address, setAddress] = useState<Address | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getLocation = async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== "granted") {
                setLoading(false);
                return;
            }

            const current = await Location.getCurrentPositionAsync({});

            const coords = {
                latitude: current.coords.latitude,
                longitude: current.coords.longitude,
            };

            setLocation(coords);

            // Reverse Geocode
            const geocode = await Location.reverseGeocodeAsync(coords);

            if (geocode.length > 0) {
                setAddress({
                    city: geocode[0].city || undefined,
                    country: geocode[0].country || undefined,
                    street: geocode[0].street || undefined,
                });
            }

            setLoading(false);
        };

        getLocation();
    }, []);

    return (
        <LocationContext.Provider value={{ location, loading, address }}>
            {children}
        </LocationContext.Provider>
    );
};

export const useLocation = () => {
    const context = useContext(LocationContext);

    if (!context) {
        throw new Error("useLocation must be used inside LocationProvider");
    }

    return context;
};