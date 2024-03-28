//TODO: Implement database

// App.js
import React, { useState, useEffect } from 'react';
import { Alert, Button, Image, Text, StyleSheet, View } from 'react-native';
import GameBoard from './components/GameBoard';
import instructionsText from './components/Instructions';

const App = () => {
  // TO DO : Add game setup and logic here, including handling orientation, saving and loading game state, and using camera for custom images
    // Example card data
    const initialCardsData = [
      { id: 1, image: require('./assets/favicon.png'), matched: false, isFlipped: false },
      { id: 2, image: require('./assets/icon.png'), matched: false, isFlipped: false },
      // Duplicate each card for matching
      { id: 1, image: require('./assets/favicon.png'), matched: false, isFlipped: false },
      { id: 2, image: require('./assets/icon.png'), matched: false, isFlipped: false },
      // Will add more cards as needed
    ];

  // Shuffle cards
  const shuffleCards = (cards) => {
    // Shuffling logic here (Fisher-Yates shuffle, etc.)
    return cards.sort(() => Math.random() - 0.5);
  };

  const [cards, setCards] = useState(shuffleCards(initialCardsData));

  // Define handleMatch function
  const handleMatch = (selectedCard) => {
    // Match checking logic here
  };

  // Function to show instructions
  const showInstructions = () => {
    Alert.alert("Instructions", instructionsText);
  };

  return (
    <View style={styles.container}>
            <Image
        source={require('./assets/icon.png')} // TO DO: change to actual logo
        style={styles.logo}
      />
      <Button title="How to Play" onPress={showInstructions} />
      <Text> Scores, restart button, etc will appear here </Text>
       <GameBoard cards={cards} onMatch={handleMatch} /> 
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
  logo: {
    height: 200, 
    resizeMode: 'contain', // To fit image within the dimensions without stretching
    marginTop: 40, 
  },
});

export default App;
