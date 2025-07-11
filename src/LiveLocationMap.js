import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

const LiveLocationMap = ({ route }) => {
  const { latitude, longitude } = route.params;
  const [location, setLocation] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    setLocation({
      latitude,
      longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  }, []);

  const handleConfirm = () => {
    navigation.navigate('WelcomeScreen4', {
      latitude,
      longitude,
    });
  };

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          style={styles.map}
          initialRegion={location}
          showsUserLocation={true}
        >
          <Marker coordinate={location} title="You are here" />
        </MapView>
      )}

      {/* ✅ Full-width Confirm Button */}
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  confirmButton: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20, // ✅ Full width with padding
    backgroundColor: '#2ecc71',
    paddingVertical: 15,
    borderRadius: 10,
    elevation: 4,
  },
  confirmText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LiveLocationMap;
