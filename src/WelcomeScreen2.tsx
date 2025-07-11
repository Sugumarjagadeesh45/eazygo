import React from 'react';
import { View, Text, Image, StyleSheet, TouchableWithoutFeedback, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen2 = () => {
  const navigation = useNavigation();

  return (
    
      <View style={styles.container}>
        <Image 
          source={require('../assets/logo3.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.mainTitle}>Track your ride</Text>
        <Text style={styles.subtitle}>
          Know your driver in advance and be able to view current location in real time on the map
        </Text>

        {/* Properly implemented Button */}
        <View style={styles.buttonContainer}>
          <Button 
            title="Continue" 
            onPress={() => navigation.navigate('WelcomeScreen4')}
            color="#2ecc71"
          />
        </View>
        
        <View style={styles.swipeIndicatorContainer}>
          <View style={styles.swipeTrack}>
            <View style={[styles.swipeProgress, { width: '100%' }]} />
          </View>
        </View>
      </View>

  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    color: '#666',
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  buttonContainer: {
    width: '80%',
    marginBottom: 30,
  },
  navigationHint: {
    position: 'absolute',
    bottom: 70,
    flexDirection: 'row',
    alignItems: 'center',
  },
  navigationHintText: {
    color: '#666',
    fontSize: 14,
  },
  navigationTarget: {
    color: 'red',
    fontSize: 14,
    fontWeight: 'bold',
  },
  swipeIndicatorContainer: {
    position: 'absolute',
    bottom: 32,
    width: '100%',
    alignItems: 'center',
  },
  swipeTrack: {
    width: 100,
    height: 3,
    backgroundColor: '#e0f2e9',
    borderRadius: 3,
    overflow: 'hidden',
  },
  swipeProgress: {
    height: '100%',
    backgroundColor: '#2ecc71',
  },
});

export default WelcomeScreen2;