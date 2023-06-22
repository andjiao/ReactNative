import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const LocationMap = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
      }
    };

    requestLocationPermission();
  }, []);

  useEffect(() => {
    const fetchCurrentLocation = async () => {
      try {
        const { coords } = await Location.getCurrentPositionAsync();
        setLocation(coords);
      } catch (error) {
        console.log('Error getting current location:', error);
      }
    };

    fetchCurrentLocation();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {location ? (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Current Location"
          />
        </MapView>
      ) : (
        <Text>Loading location...</Text>
      )}
    </View>
  );
};

export default LocationMap;
