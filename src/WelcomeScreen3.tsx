import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  Linking,
  Modal,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

const locationData = {
  TamilNadu: {
    Chennai: ['Adyar', 'Ambattur', 'Anna Nagar', 'Avadi', 'Guindy', 'T. Nagar', 'Velachery'],
    Coimbatore: ['Coimbatore North', 'Coimbatore South', 'Mettupalayam', 'Pollachi', 'Sulur'],
    Madurai: ['Madurai North', 'Madurai South', 'Melur', 'Peraiyur', 'Thirumangalam'],
    Trichy: ['Srirangam', 'Thillai Nagar', 'Golden Rock', 'Woraiyur'],
    Salem: ['Salem North', 'Salem South', 'Attur', 'Mettur', 'Omalur'],
    Erode: ['Perundurai', 'Gobichettipalayam', 'Bhavani', 'Sathyamangalam', 'Kangeyam'],
    Tirunelveli: ['Tirunelveli', 'Ambasamudram', 'Nanguneri', 'Palayamkottai'],
    Vellore: ['Vellore', 'Arcot', 'Gudiyatham', 'Katpadi', 'Walajapet']
  },
  Kerala: {
    Thiruvananthapuram: ['Kazhakoottam', 'Neyyattinkara', 'Attingal', 'Nedumangad', 'Varkala'],
    Kochi: ['Mattancherry', 'Fort Kochi', 'Aluva', 'Edappally', 'Kakkanad'],
    Kozhikode: ['Kozhikode', 'Koyilandy', 'Ramanattukara', 'Vatakara'],
    Thrissur: ['Thrissur', 'Chalakudy', 'Guruvayur', 'Irinjalakuda', 'Kodungallur'],
    Kannur: ['Kannur', 'Thalassery', 'Payyannur', 'Iritty']
  },
  Karnataka: {
    Bangalore: ['Bangalore North', 'Bangalore South', 'Bangalore East', 'Bangalore West', 'Yelahanka'],
    Mysore: ['Mysore', 'Hunsur', 'Krishnarajanagara', 'Nanjanagudu', 'Tirumakudalu'],
    Mangalore: ['Mangalore', 'Bantwal', 'Belthangady', 'Puttur', 'Sullia'],
    Hubli: ['Hubli', 'Dharwad', 'Gadag', 'Haveri', 'Kundgol'],
    Belgaum: ['Belgaum', 'Bailhongal', 'Chikodi', 'Gokak', 'Khanapur']
  },
  AndhraPradesh: {
    Visakhapatnam: ['Visakhapatnam', 'Anakapalle', 'Bheemunipatnam', 'Paderu', 'Yelamanchili'],
    Vijayawada: ['Vijayawada', 'Gannavaram', 'Jaggayyapeta', 'Nandigama', 'Tiruvuru'],
    Guntur: ['Guntur', 'Chilakaluripet', 'Mangalagiri', 'Narasaraopet', 'Tenali'],
    Tirupati: ['Tirupati', 'Chandragiri', 'Chittoor', 'Madanapalle', 'Palamaner']
  },
  Maharashtra: {
    Mumbai: ['Andheri', 'Bandra', 'Borivali', 'Dadar', 'Thane', 'Vasai', 'Virar'],
    Pune: ['Pune', 'Baramati', 'Bhor', 'Daund', 'Junnar', 'Mulshi', 'Pimpri-Chinchwad'],
    Nagpur: ['Nagpur', 'Katol', 'Kamptee', 'Ramtek', 'Umred'],
    Nashik: ['Nashik', 'Malegaon', 'Niphad', 'Sinnar', 'Yevla']
  },
  Delhi: {
    'New Delhi': ['Connaught Place', 'Chanakyapuri', 'Daryaganj', 'Karol Bagh', 'Paharganj'],
    'North Delhi': ['Civil Lines', 'Kamla Nagar', 'Kotwali', 'Sadar Bazar', 'Shahdara'],
    'West Delhi': ['Janakpuri', 'Rajouri Garden', 'Punjabi Bagh', 'Vikaspuri']
  },
  WestBengal: {
    Kolkata: ['Alipore', 'Behala', 'Bhowanipore', 'Salt Lake', 'New Town'],
    Howrah: ['Howrah', 'Amta', 'Bagnan', 'Uluberia'],
    Darjeeling: ['Darjeeling', 'Kurseong', 'Mirik', 'Kalimpong']
  }
};

const WelcomeScreen3 = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [manualModalVisible, setManualModalVisible] = useState(false);

  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedTaluk, setSelectedTaluk] = useState('');

  const states = Object.keys(locationData);
  const districts = selectedState ? Object.keys(locationData[selectedState]) : [];
  const taluks = selectedState && selectedDistrict ? locationData[selectedState][selectedDistrict] : [];

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => resolve(position),
        error => reject(error),
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        }
      );
    });
  };

  const handleUseCurrentLocation = async () => {
    setLoading(true);
    try {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        Alert.alert(
          'Permission Denied',
          'Enable location permission in settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => Linking.openSettings() },
          ]
        );
        setLoading(false);
        return;
      }

      const location = await getCurrentLocation();
      const { latitude, longitude } = location.coords;

      const response = await axios.post('http://192.168.1.110:5000/api/location', {
        latitude,
        longitude,
      });

      navigation.navigate('LiveLocationMap', {
        latitude,
        longitude,
      });
    } catch (error) {
      console.error('Location Error:', error);
      Alert.alert('Location Error', error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }

    
  };

  
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo4.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <Text style={{fontSize:40}}>Hi, nice to meet you!</Text>
<Text style={styles.subText}>
  Choose your location to start find restaurants around you.
</Text>


      <TouchableOpacity
        style={styles.locationButton}
        onPress={handleUseCurrentLocation}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Image
              source={require('../assets/logo4.png')}
              style={styles.locationIcon}
            />
            <Text style={styles.buttonText}>Use current location</Text>
          </>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.manualButton}
        onPress={() => setManualModalVisible(true)}
      >
        <Text style={styles.manualButtonText}>Select it manually</Text>
      </TouchableOpacity>

      {/* Modal for manual location selector */}
      <Modal
        transparent
        visible={manualModalVisible}
        animationType="fade"
        onRequestClose={() => setManualModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Select Your Location</Text>

            <Picker
              selectedValue={selectedState}
              onValueChange={itemValue => {
                setSelectedState(itemValue);
                setSelectedDistrict('');
                setSelectedTaluk('');
              }}
            >
              <Picker.Item label="Select State" value="" />
              {states.map(state => (
                <Picker.Item key={state} label={state} value={state} />
              ))}
            </Picker>

            {selectedState && (
              <Picker
                selectedValue={selectedDistrict}
                onValueChange={itemValue => {
                  setSelectedDistrict(itemValue);
                  setSelectedTaluk('');
                }}
              >
                <Picker.Item label="Select District" value="" />
                {districts.map(dist => (
                  <Picker.Item key={dist} label={dist} value={dist} />
                ))}
              </Picker>
            )}

            {selectedDistrict && (
              <Picker
                selectedValue={selectedTaluk}
                onValueChange={itemValue => setSelectedTaluk(itemValue)}
              >
                <Picker.Item label="Select City" value="" />
                {taluks.map(taluk => (
                  <Picker.Item key={taluk} label={taluk} value={taluk} />
                ))}
              </Picker>
            )}

            {selectedTaluk ? (
<TouchableOpacity
  style={styles.nextButton}
  onPress={() => {
    setManualModalVisible(false);
    navigation.navigate('WelcomeScreen4', {
      state: selectedState,
      district: selectedDistrict,
      taluk: selectedTaluk,
    });
  }}
>
  <Text style={styles.nextButtonText}>Confirm</Text>
</TouchableOpacity>

            ) : null}

            <TouchableOpacity onPress={() => setManualModalVisible(false)}>
              <Text style={{ marginTop: 10, color: 'red', textAlign: 'center' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#ffffff' },
  logoContainer: { width: '100%', height: '35%', backgroundColor: '#11d94a', justifyContent: 'center', alignItems: 'center', marginBottom: 20, borderRadius: 10 },
  logo: { width: '80%', height: '80%', resizeMode: 'contain' },
  locationButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#2ecc71', paddingVertical: 15, paddingHorizontal: 25, borderRadius: 8, marginBottom: 20, width: '80%', justifyContent: 'center' },
  locationIcon: { width: 20, height: 20, marginRight: 10, tintColor: '#ffffff' },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: '600' },
  manualButton: { padding: 10 },
  manualButtonText: { color: '#2ecc71', fontSize: 16, fontWeight: '600', textDecorationLine: 'underline' },
  modalBackground: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)' },
  modalBox: { backgroundColor: '#fff', padding: 20, borderRadius: 10, width: 300, elevation: 5 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  nextButton: { backgroundColor: '#2ecc71', padding: 12, borderRadius: 8, marginTop: 15 },
  nextButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
  subText: {
  fontSize: 18,
  textAlign: 'center',
  marginVertical: 10,
  color: '#333'
}

});

export default WelcomeScreen3;



























































































// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
//   ActivityIndicator,
//   PermissionsAndroid,
//   Platform,
//   Linking,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import Geolocation from '@react-native-community/geolocation';
// import axios from 'axios';

// const WelcomeScreen3 = () => {
//   const navigation = useNavigation();
//   const [loading, setLoading] = useState(false);

//   const requestLocationPermission = async () => {
//     if (Platform.OS === 'android') {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//           {
//             title: 'Location Permission',
//             message: 'This app needs access to your location',
//             buttonNeutral: 'Ask Me Later',
//             buttonNegative: 'Cancel',
//             buttonPositive: 'OK',
//           }
//         );
//         return granted === PermissionsAndroid.RESULTS.GRANTED;
//       } catch (err) {
//         console.warn(err);
//         return false;
//       }
//     }
//     return true;
//   };

//   const getCurrentLocation = () => {
//     return new Promise((resolve, reject) => {
//       Geolocation.getCurrentPosition(
//         position => resolve(position),
//         error => reject(error),
//         {
//           enableHighAccuracy: true,
//           timeout: 15000,
//           maximumAge: 10000,
//         }
//       );
//     });
//   };

//   const handleUseCurrentLocation = async () => {
//     setLoading(true);
//     try {
//       const hasPermission = await requestLocationPermission();
//       if (!hasPermission) {
//         Alert.alert(
//           'Permission Denied',
//           'Enable location permission in settings.',
//           [
//             { text: 'Cancel', style: 'cancel' },
//             { text: 'Open Settings', onPress: () => Linking.openSettings() },
//           ]
//         );
//         setLoading(false);
//         return;
//       }

//       const location = await getCurrentLocation();
//       const { latitude, longitude } = location.coords;

//       const response = await axios.post('http://192.168.1.110:5000/api/location', {
//         latitude,
//         longitude,
//       });

//       navigation.navigate('LiveLocationMap', {
//         latitude,
//         longitude,
//       });
//     } catch (error) {
//       console.error('Location Error:', error);
//       Alert.alert('Location Error', error.message || 'Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
    
//     <View style={styles.container}>
      

//       <View style={styles.logoContainer}>
//         <Image
//           source={require('../assets/logo4.png')}
//           style={styles.logo}
//           resizeMode="contain"
//         />
//       </View>

      

//       <TouchableOpacity
//         style={styles.locationButton}
//         onPress={handleUseCurrentLocation}
//         disabled={loading}
//       >
//         {loading ? (
//           <ActivityIndicator color="#fff" />
//         ) : (
//           <>
//             <Image
//               source={require('../assets/logo4.png')}
//               style={styles.locationIcon}
//             />
//             <Text style={styles.buttonText}>Use current location</Text>
//           </>
//         )}
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.manualButton}
//         onPress={() => navigation.navigate('LocationSearch')}
//       >
//         <Text style={styles.manualButtonText}>Select it manually</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#ffffff' },
//   logoContainer: { width: '100%', height: '35%', backgroundColor: '#11d94a', justifyContent: 'center', alignItems: 'center', marginBottom: 20, borderRadius: 10 },
//   logo: { width: '80%', height: '80%', resizeMode: 'contain' },
//   greeting: { fontSize: 22, fontWeight: 'bold', color: '#333333', marginBottom: 15, textAlign: 'center' },
//   instruction: { fontSize: 16, color: '#666666', textAlign: 'center', marginBottom: 40, paddingHorizontal: 30, lineHeight: 24 },
//   locationButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#2ecc71', paddingVertical: 15, paddingHorizontal: 25, borderRadius: 8, marginBottom: 20, width: '80%', justifyContent: 'center', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 2 },
//   locationIcon: { width: 20, height: 20, marginRight: 10, tintColor: '#ffffff' },
//   buttonText: { color: '#ffffff', fontSize: 16, fontWeight: '600' },
//   manualButton: { padding: 10 },
//   manualButtonText: { color: '#2ecc71', fontSize: 16, fontWeight: '600', textDecorationLine: 'underline' },
// });

// export default WelcomeScreen3;








// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
//   ActivityIndicator,
//   PermissionsAndroid,
//   Platform,
//   Linking,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import Geolocation from '@react-native-community/geolocation';
// import axios from 'axios';

// const WelcomeScreen3 = () => {
//   const navigation = useNavigation();
//   const [loading, setLoading] = useState(false);

//   const requestLocationPermission = async () => {
//     if (Platform.OS === 'android') {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//           {
//             title: 'Location Permission',
//             message: 'This app needs access to your location',
//             buttonNeutral: 'Ask Me Later',
//             buttonNegative: 'Cancel',
//             buttonPositive: 'OK',
//           }
//         );
//         return granted === PermissionsAndroid.RESULTS.GRANTED;
//       } catch (err) {
//         console.warn(err);
//         return false;
//       }
//     }
//     return true;
//   };

//   const getCurrentLocation = () => {
//     return new Promise((resolve, reject) => {
//       Geolocation.getCurrentPosition(
//         position => resolve(position),
//         error => reject(error),
//         {
//           enableHighAccuracy: true,
//           timeout: 15000,
//           maximumAge: 10000,
//         }
//       );
//     });
//   };

//   const handleUseCurrentLocation = async () => {
//     setLoading(true);

//     try {
//       const hasPermission = await requestLocationPermission();
//       if (!hasPermission) {
//         Alert.alert(
//           'Permission Denied',
//           'Enable location permission in settings.',
//           [
//             { text: 'Cancel', style: 'cancel' },
//             { text: 'Open Settings', onPress: () => Linking.openSettings() },
//           ]
//         );
//         setLoading(false);
//         return;
//       }

//       const location = await getCurrentLocation();
//       const { latitude, longitude } = location.coords;

//       // const response = await axios.post('http://192.168.29.210:5000/api/location', {
//       //   latitude,
//       //   longitude,
//       // });
//       const response = await axios.post('http://192.168.1.110:5000/api/location', {
//         latitude,
//         longitude,
//       });

// navigation.navigate('LiveLocationMap', {
//   latitude,
//   longitude
// });





//     } catch (error) {
//       console.error('Location Error:', error);
//       Alert.alert('Location Error', error.message || 'Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.logoContainer}>
//         <Image
//           source={require('../assets/logo4.png')}
//           style={styles.logo}
//           resizeMode="contain"
//         />
//       </View>

//       <Text style={styles.greeting}>Hi, nice to meet you!</Text>
//       <Text style={styles.instruction}>
//         Choose your location to start find restaurants around you.
//       </Text>

//       <TouchableOpacity
//         style={styles.locationButton}
//         onPress={handleUseCurrentLocation}
//         disabled={loading}
//       >
//         {loading ? (
//           <ActivityIndicator color="#fff" />
//         ) : (
//           <>
//             <Image
//               source={require('../assets/logo4.png')}
//               style={styles.locationIcon}
//             />
//             <Text style={styles.buttonText}>Use current location</Text>
//           </>
//         )}
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.manualButton}
//         onPress={() => navigation.navigate('LocationSearch')}
//       >
//         <Text style={styles.manualButtonText}>Select it manually</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#ffffff' },
//   logoContainer: { width: '100%', height: '35%', backgroundColor: '#11d94a', justifyContent: 'center', alignItems: 'center', marginBottom: 20, borderRadius: 10 },
//   logo: { width: '80%', height: '80%', resizeMode: 'contain' },
//   greeting: { fontSize: 22, fontWeight: 'bold', color: '#333333', marginBottom: 15, textAlign: 'center' },
//   instruction: { fontSize: 16, color: '#666666', textAlign: 'center', marginBottom: 40, paddingHorizontal: 30, lineHeight: 24 },
//   locationButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#2ecc71', paddingVertical: 15, paddingHorizontal: 25, borderRadius: 8, marginBottom: 20, width: '80%', justifyContent: 'center', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 2 },
//   locationIcon: { width: 20, height: 20, marginRight: 10, tintColor: '#ffffff' },
//   buttonText: { color: '#ffffff', fontSize: 16, fontWeight: '600' },
//   manualButton: { padding: 10 },
//   manualButtonText: { color: '#2ecc71', fontSize: 16, fontWeight: '600', textDecorationLine: 'underline' },
// });

// export default WelcomeScreen3;
