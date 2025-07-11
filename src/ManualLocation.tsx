import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

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

const ManualLocationSelector = () => {
  const navigation = useNavigation();
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedTaluk, setSelectedTaluk] = useState('');

  const states = Object.keys(locationData);
  const districts = selectedState ? Object.keys(locationData[selectedState]) : [];
  const taluks = selectedState && selectedDistrict ? locationData[selectedState][selectedDistrict] : [];

  const handleNext = () => {
    if (selectedState && selectedDistrict && selectedTaluk) {
      navigation.navigate('LiveLocationMap', {
        state: selectedState,
        district: selectedDistrict,
        taluk: selectedTaluk,
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Select Your Location</Text>

      <Picker
        selectedValue={selectedState}
        onValueChange={itemValue => {
          setSelectedState(itemValue);
          setSelectedDistrict('');
          setSelectedTaluk('');
        }}
        style={styles.picker}
      >
        <Picker.Item label="Select State" value="" />
        {states.map(state => (
          <Picker.Item key={state} label={state} value={state} />
        ))}
      </Picker>

      {selectedState ? (
        <Picker
          selectedValue={selectedDistrict}
          onValueChange={itemValue => {
            setSelectedDistrict(itemValue);
            setSelectedTaluk('');
          }}
          style={styles.picker}
        >
          <Picker.Item label="Select District" value="" />
          {districts.map(district => (
            <Picker.Item key={district} label={district} value={district} />
          ))}
        </Picker>
      ) : null}

      {selectedDistrict ? (
        <Picker
          selectedValue={selectedTaluk}
          onValueChange={itemValue => setSelectedTaluk(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Taluk" value="" />
          {taluks.map(taluk => (
            <Picker.Item key={taluk} label={taluk} value={taluk} />
          ))}
        </Picker>
      ) : null}

      {selectedTaluk ? (
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'stretch',
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2ecc71',
  },
  picker: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 20,
  },
  nextButton: {
    backgroundColor: '#2ecc71',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ManualLocationSelector;
