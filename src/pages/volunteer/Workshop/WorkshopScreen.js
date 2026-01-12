import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WorkshopScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workshop</Text>
      <Text style={styles.content}>This is the Workshop screen. Add your workshop content here.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  content: {
    fontSize: 16,
    color: '#555',
  },
});

export default WorkshopScreen;
