import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SelectedLocation = ({ route }) => {
  const { state, district, taluk } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>You selected:</Text>
      <Text style={styles.item}>State: {state}</Text>
      <Text style={styles.item}>District: {district}</Text>
      <Text style={styles.item}>Taluk: {taluk}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  item: { fontSize: 18, marginVertical: 5 }
});

export default SelectedLocation;
