// App.js
import React, { useState, useEffect } from 'react';
import { Alert, Text, StyleSheet, View } from 'react-native';
import GameBoard from './components/GameBoard';
import instructionsText from './components/Instructions';

const App = () => {
  // TO DO : Add game setup and logic here, including handling orientation, saving and loading game state, and using camera for custom images

  return (
    <View style={styles.container}>
      <Text> Cards will appear here </Text>
      {/* TO DO: <GameBoard cards={cards} onMatch={handleMatch} /> */}
      {/* TO DO: Add additional UI elements like score, restart button, etc. */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});

export default App;
