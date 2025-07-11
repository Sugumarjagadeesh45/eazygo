import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from './authApi';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await login(email, password);
      await AsyncStorage.setItem('token', res.data.token);
      Alert.alert('Success', 'Login successful');
      navigation.replace('Screen5'); // ✅ Make sure 'Screen5' is registered in App.tsx
    } catch (err: any) {
      Alert.alert('Login Failed', err?.response?.data?.msg || 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 20,
    backgroundColor: '#fff',
  },
  title: { 
    fontSize: 24, 
    marginBottom: 20, 
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1, 
    borderColor: '#ccc', 
    padding: 12, 
    borderRadius: 8, 
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#2ecc71',
    padding: 14, 
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff', 
    textAlign: 'center', 
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LoginScreen;




// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { login } from './authApi';

// const Screen4 = ({ navigation }: any) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

// const handleLogin = async () => {
//   try {
//     const res = await login(email, password);
//     await AsyncStorage.setItem('token', res.data.token);
//     Alert.alert('Success', 'Login successful');
//     navigation.replace('Screen5'); // 🔥 Navigate after login
//   } catch (err: any) {
//     Alert.alert('Login Failed', err?.response?.data?.msg || 'Something went wrong');
//   }
// };


//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Login</Text>
//       <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         value={password}
//         secureTextEntry
//         onChangeText={setPassword}
//       />
//       <TouchableOpacity style={styles.button} onPress={handleLogin}>
//         <Text style={styles.buttonText}>Login</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', padding: 20 },
//   title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
//   input: {
//     borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8, marginBottom: 10,
//   },
//   button: {
//     backgroundColor: '#007e33', padding: 14, borderRadius: 8,
//   },
//   buttonText: {
//     color: '#fff', textAlign: 'center', fontSize: 16,
//   },
// });

// export default Screen4;
