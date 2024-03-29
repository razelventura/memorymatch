//TODO: Implement database

// App.js
import React, { useState, useEffect, useRef } from 'react';
import { Alert, Button, Image, Text, StyleSheet, View } from 'react-native';
import GameBoard from './components/GameBoard';
import instructionsText from './components/Instructions';

const App = () => {
  // TO DO : Add game setup and logic here, including handling orientation, saving and loading game state, and using camera for custom images
    // Example card data
    const initialCardsData = [
      { id: 1, image: require('./pics/image1.jpeg'), matched: false, isFlipped: false },
      { id: 2, image: require('./pics/image2.jpeg'), matched: false, isFlipped: false },
/*       { id: 3, image: require('./pics/image3.jpeg'), matched: false, isFlipped: false },
      { id: 4, image: require('./pics/image4.jpeg'), matched: false, isFlipped: false },
      { id: 5, image: require('./pics/image5.jpeg'), matched: false, isFlipped: false },
      { id: 6, image: require('./pics/image6.jpeg'), matched: false, isFlipped: false },
      { id: 7, image: require('./pics/image7.jpeg'), matched: false, isFlipped: false },
      { id: 8, image: require('./pics/image8.jpeg'), matched: false, isFlipped: false },
      { id: 9, image: require('./pics/image9.jpeg'), matched: false, isFlipped: false },
      { id: 10, image: require('./pics/image10.jpeg'), matched: false, isFlipped: false }, */
      // Duplicate each card for matching
      { id: 1, image: require('./pics/image1.jpeg'), matched: false, isFlipped: false },
      { id: 2, image: require('./pics/image2.jpeg'), matched: false, isFlipped: false },
/*       { id: 3, image: require('./pics/image3.jpeg'), matched: false, isFlipped: false },
      { id: 4, image: require('./pics/image4.jpeg'), matched: false, isFlipped: false },
      { id: 5, image: require('./pics/image5.jpeg'), matched: false, isFlipped: false },
      { id: 6, image: require('./pics/image6.jpeg'), matched: false, isFlipped: false },
      { id: 7, image: require('./pics/image7.jpeg'), matched: false, isFlipped: false },
      { id: 8, image: require('./pics/image8.jpeg'), matched: false, isFlipped: false },
      { id: 9, image: require('./pics/image9.jpeg'), matched: false, isFlipped: false },
      { id: 10, image: require('./pics/image10.jpeg'), matched: false, isFlipped: false }, */
      // Will add more cards as needed
    ];

    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [timer, setTimer] = useState(0);
    const timerRef = useRef(null);
    const [baseTimeScore, setBaseTimeScore] = useState(500); 

  //Start timer (adapted from Mines Wept)
  const startTimer = () => {
    if (timerRef.current !== null) return;
    setTimer(0);
    timerRef.current = setInterval(() => {
      setTimer(t => t + 1);
      //setBaseTimeScore(score => score - 1 * difficulties[difficulty].mineCount);
    }, 1000);
  };

  //Stop timer (adapted from Mines Wept)
  const stopTimer = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // useEffect to handle component mount and unmount
  useEffect(() => {
    newGame();
    //newGame('easy'); // Set the new game to easy on first load
    startTimer();    // Start the timer immediately
    
    // Cleanup function to stop the timer when the component unmounts
    return () => stopTimer(); 
  }, []); // Empty dependency array means this runs once on mount

  // Shuffle cards
  const shuffleCards = (cards) => {
    // Shuffling logic here (Fisher-Yates shuffle, etc.)
    return cards.sort(() => Math.random() - 0.5);
  };

  const [cards, setCards] = useState(shuffleCards(initialCardsData));

  // handleMatch function
  const handleMatch = (selectedCard) => {
    // Match checking logic here
  };

  // Toggle flip state of a card
  const toggleFlip = (index) => {
    setCards(currentCards =>
      currentCards.map((card, i) => {
        if (i === index) {
          return { ...card, isFlipped: !card.isFlipped };
        }
        return card;
      }),
    );
  };

  // Reset Game - Reset the cards without shuffling
  const resetGame = () => {
    setFlippedCards([]);
    setMatchedCards([]);
    setTimer(0); // Reset the timer
    startTimer(); // Start the timer for the new game
    setCards(currentCards => currentCards.map(card => ({ ...card, isFlipped: false })));
  };

  // New Game - Shuffle the cards and set them to an unflipped state
  const newGame = () => {
    setFlippedCards([]);
    setMatchedCards([]);
    setTimer(0); // Reset the timer
    startTimer(); // Start the timer for the new game
    setCards(shuffleCards(initialCardsData.map(card => ({ ...card, isFlipped: false }))));
  };

  // Function to show instructions (adapted from Mines Wept)
  const showInstructions = () => {
    Alert.alert("Instructions", instructionsText);
  };

  return (
    <View style={styles.container}>
            <Image
        source={require('./assets/icon.png')} // TO DO: change to actual logo
        style={styles.logo}
      />
        <View style={styles.buttonContainer}>
          <Button title="Reset" onPress={resetGame} />
          <Button title="New Game" onPress={newGame} />
          <Button title="How to Play" onPress={showInstructions} />
      </View>
      <Text> Scores and Timer will appear here </Text>
      <Text>Time (seconds): {timer}</Text>
      <GameBoard
        cards={cards}
        onCardPress={toggleFlip}
        onMatch={handleMatch}
        flippedCards={flippedCards}
        setFlippedCards={setFlippedCards}
        matchedCards={matchedCards}
        setMatchedCards={setMatchedCards}
      />
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%', // Ensure the buttons are spaced across the width of the screen
    marginBottom: 20, // Space between the buttons and the game board
  },
});

export default App;
