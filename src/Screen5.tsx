import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Screen5 = () => {
  return (
    <LinearGradient colors={['#00c851', '#007e33']} style={styles.container}>
      <Text style={styles.text}>🎉 Welcome to Screen 2 🎉</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default Screen5;

// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const Screen5 = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Welcome to Screen 2</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   text: { fontSize: 24 },
// });

// export default Screen5;