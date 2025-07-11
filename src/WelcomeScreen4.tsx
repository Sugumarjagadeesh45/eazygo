import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Image, KeyboardAvoidingView,
  Platform, Alert
} from 'react-native';
import axios from 'axios';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const WelcomeScreen4 = ({ navigation }) => {
  const [step, setStep] = useState('mobile');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: 'YOUR_GOOGLE_WEB_CLIENT_ID',
      offlineAccess: true,
    });
  }, []);

  const sendOtp = async () => {
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      return Alert.alert('Validation Error', 'Enter a valid 10-digit mobile number');
    }
    try {
      const res = await axios.post('http://localhost:5000/api/send-otp', { mobile });
      if (res.data.success) {
        setStep('otp');
        Alert.alert('OTP Sent', 'Please enter the 6-digit OTP');
      }
    } catch (err) {
      Alert.alert('Error', err.response?.data?.error || 'Failed to send OTP');
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/verify-otp', { mobile, otp });
      if (res.data.success) {
        navigation.replace('Screen1');
      }
    } catch {
      Alert.alert('Error', 'OTP is wrong.');
    }
  };

  const handleGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const info = await GoogleSignin.signIn();
      setEmail(info.user.email);
      setName(info.user.name);
      setStep('email');
    } catch {
      Alert.alert('Google Sign-In Failed');
    }
  };

  const handleEmailSignUp = () => {
    Alert.alert('Success', 'Sign-Up Completed');
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.logoArea}>
        <Image source={require('../assets/11111.png')} style={styles.logo} resizeMode="contain"/>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>EAZY GO</Text>
        {step === 'mobile' && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Enter Phone Number"
              keyboardType="phone-pad"
              maxLength={10}
              value={mobile}
              onChangeText={setMobile}
            />
            <TouchableOpacity style={styles.continueButton} onPress={sendOtp}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </>
        )}

        {step === 'otp' && (
          <>
            <Text style={styles.otpTitle}>Verify OTP</Text>
            <TextInput
              style={[styles.input, styles.otpInput]}
              placeholder="6-digit OTP"
              keyboardType="number-pad"
              maxLength={6}
              value={otp}
              onChangeText={setOtp}
            />
            <TouchableOpacity style={styles.continueButton} onPress={verifyOtp}>
              <Text style={styles.buttonText}>Verify Now</Text>
            </TouchableOpacity>
          </>
        )}

        {step === 'email' && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Enter Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.continueButton} onPress={handleEmailSignUp}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </>
        )}

        {step !== 'otp' && (
          <>
            <Text style={styles.orText}>------------ or ------------</Text>
            <View style={styles.iconRow}>
              <TouchableOpacity onPress={handleGoogle}>
                <FontAwesome5 name="google" size={30} color="#2ecc71"/>
              </TouchableOpacity>
              {step !== 'email' ? (
                <TouchableOpacity onPress={() => setStep('email')}>
                  <FontAwesome5 name="envelope" size={30} color="#2ecc71"/>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setStep('mobile')}>
                  <FontAwesome5 name="mobile-alt" size={30} color="#2ecc71"/>
                </TouchableOpacity>
              )}
            </View>
          </>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#11d94a' },
  logoArea: { height: '40%', justifyContent: 'center', alignItems: 'center' },
  logo: { width: '90%', height: '80%' },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 25,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#11d94a',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    padding: 15,
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  continueButton: {
    backgroundColor: '#11d94a',
    borderRadius: 8,
    padding: 15,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  orText: {
    color: '#999',
    marginBottom: 20,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    marginBottom: 20,
  },
  otpTitle: { fontSize: 20, marginVertical: 10 },
  otpInput: { letterSpacing: 10, textAlign: 'center', fontSize: 18 },
});

export default WelcomeScreen4;














// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   KeyboardAvoidingView,
//   Platform,
//   Alert,
// } from 'react-native';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// const WelcomeScreen4 = () => {
//   const [emailBoxVisible, setEmailBoxVisible] = useState(false);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [mobile, setMobile] = useState('');
//   const [password, setPassword] = useState('');

//   useEffect(() => {
//     GoogleSignin.configure({
//       webClientId: '821907414902-ifhrfmqjhov0if5qc5muhtcg2015q19e.apps.googleusercontent.com',
//       offlineAccess: true,
//     });
//   }, []);

//   const validateForm = () => {
//     const emailRegex = /^[a-z0-9._%+-]+@(gmail|yahoo|hotmail)\.com$/;
//     const mobileRegex = /^[6-9]\d{9}$/;
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;

//     if (!mobileRegex.test(mobile)) {
//       Alert.alert('Validation Error', 'Enter a valid mobile number');
//       return false;
//     }
//     if (!emailRegex.test(email)) {
//       Alert.alert('Validation Error', 'Enter a valid email');
//       return false;
//     }
//     if (!passwordRegex.test(password)) {
//       Alert.alert('Validation Error', 'Password must include uppercase, lowercase, number and symbol');
//       return false;
//     }
//     return true;
//   };

//   const handleSignUp = () => {
//     if (validateForm()) {
//       Alert.alert('Success', 'Sign Up Success!');
//     }
//   };

//   const handleGoogleLogin = async () => {
//     try {
//       await GoogleSignin.hasPlayServices();
//       const userInfo = await GoogleSignin.signIn();
//       setEmail(userInfo.user.email || '');
//       setName(userInfo.user.name || '');
//       Alert.alert('Google Login Success', `Welcome ${userInfo.user.name}`);
//     } catch (error) {
//       Alert.alert('Error', 'Google Sign-In Failed');
//     }
//   };

//   return (
//     <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
//       <View style={styles.logoArea}>
//         <Image source={require('../assets/11111.png')} style={styles.logo} resizeMode="contain" />
//       </View>

//       <View style={styles.card}>
//         <Text style={styles.title}>EAZY GO</Text>
//         <Text style={styles.subTitle}>-------------- Login or sign up --------------</Text>

//         {!emailBoxVisible ? (
//           <>
//             <View style={styles.inputRow}>
//               <Text style={styles.countryCode}>+91</Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Enter Phone Number"
//                 keyboardType="phone-pad"
//                 maxLength={10}
//                 value={mobile}
//                 onChangeText={setMobile}
//               />
//             </View>

//             <TouchableOpacity style={styles.continueButton}>
//               <Text style={styles.buttonText}>Continue</Text>
//             </TouchableOpacity>
//           </>
//         ) : (
//           <>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter Name"
//               value={name}
//               onChangeText={setName}
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="Mobile Number"
//               keyboardType="phone-pad"
//               maxLength={10}
//               value={mobile}
//               onChangeText={setMobile}
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="Email"
//               autoCapitalize="none"
//               keyboardType="email-address"
//               value={email}
//               onChangeText={setEmail}
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="Password"
//               secureTextEntry
//               value={password}
//               onChangeText={setPassword}
//             />

//             <TouchableOpacity style={styles.continueButton} onPress={handleSignUp}>
//               <Text style={styles.buttonText}>Sign Up</Text>
//             </TouchableOpacity>
//           </>
//         )}

//         <Text style={styles.orText}>------------ or ------------</Text>

//         <View style={styles.iconRow}>
//           <TouchableOpacity onPress={handleGoogleLogin}>
//             <FontAwesome5 name="google" size={30} color="#2ecc71" />
//           </TouchableOpacity>

//           {!emailBoxVisible ? (
//             <TouchableOpacity onPress={() => setEmailBoxVisible(true)}>
//               <FontAwesome5 name="envelope" size={30} color="#2ecc71" />
//             </TouchableOpacity>
//           ) : (
//             <TouchableOpacity onPress={() => setEmailBoxVisible(false)}>
//               <FontAwesome5 name="mobile-alt" size={30} color="#2ecc71" />
//             </TouchableOpacity>
//           )}
//         </View>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#11d94a' },
//   logoArea: { height: '40%', justifyContent: 'center', alignItems: 'center' },
//   logo: { width: '90%', height: '80%' },

//   card: {
//     flex: 1,
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 25,
//     borderTopRightRadius: 25,
//     padding: 25,
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     color: '#11d94a',
//     marginBottom: 10,
//   },
//   subTitle: {
//     color: '#999',
//     marginBottom: 20,
//     fontSize: 14,
//   },
//   inputRow: {
//     flexDirection: 'row',
//     backgroundColor: '#f5f5f5',
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     width: '100%',
//     marginBottom: 20,
//   },
//   countryCode: {
//     padding: 15,
//     fontSize: 16,
//     color: '#333',
//   },
//   input: {
//     width: '100%',
//     padding: 15,
//     fontSize: 16,
//     marginBottom: 10,
//     backgroundColor: '#f5f5f5',
//     borderRadius: 8,
//   },
//   continueButton: {
//     backgroundColor: '#11d94a',
//     borderRadius: 8,
//     padding: 15,
//     width: '100%',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   orText: {
//     color: '#999',
//     marginBottom: 20,
//   },
//   iconRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     width: '60%',
//     marginBottom: 20,
//   },
// });

// export default WelcomeScreen4;
