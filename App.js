// App.js
import React, { useState, useEffect, useRef } from 'react';
import { Alert, Button, Image, Text, StyleSheet, TouchableOpacity, Vibration, View } from 'react-native';
import GameBoard from './components/GameBoard';
import instructionsText from './components/Instructions';
import * as ScreenOrientation from 'expo-screen-orientation';
import {Audio} from 'expo-av';
import * as FileSystem from 'expo-file-system';

const App = () => {

  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [timer, setTimer] = useState(0);
  const timerRef = useRef(null);
  const [baseTimeScore, setBaseTimeScore] = useState(500); 
  const [revealScore, setRevealScore] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [difficulty, setDifficulty] = useState('easy');
  const gameStateFile = FileSystem.documentDirectory + 'gameState.json';

  // Function to load the game state
  const loadGameState = async () => {
    try {
      // First, check if the file exists
      const fileInfo = await FileSystem.getInfoAsync(gameStateFile);
      if (!fileInfo.exists) {
        console.log('Game state file does not exist, initializing with default values.');
        // Initialize with default values
        setDifficulty('easy'); // Default difficulty
        setHighScore(0); // Default high score
        // Consider saving these defaults now
        await saveGameState();
      } else {
        // If the file exists, proceed with loading
        const gameStateString = await FileSystem.readAsStringAsync(gameStateFile);
        const gameState = JSON.parse(gameStateString);
        setDifficulty(gameState.difficulty);
        setHighScore(gameState.highScore);
      }
    } catch (error) {
      console.log('Error loading game state:', error);
    }
  };

  // Function to save the game state
  const saveGameState = async () => {
    try {
      const gameState = {
        difficulty: difficulty,
        highScore: highScore,
      };
      await FileSystem.writeAsStringAsync(gameStateFile, JSON.stringify(gameState));
    } catch (error) {
      console.log('Error saving game state:', error);
    }
  }; 

  // useEffect for component mount and unmount
  useEffect(() => {
    loadGameState();
    return () => saveGameState();
  }, []);

    // All available cards
    const allCardsData = [
      { id: 1, image: require('./pics/image1.jpeg'), matched: false, isFlipped: false },
      { id: 2, image: require('./pics/image2.jpeg'), matched: false, isFlipped: false },
      { id: 3, image: require('./pics/image3.jpeg'), matched: false, isFlipped: false },
      { id: 4, image: require('./pics/image4.jpeg'), matched: false, isFlipped: false },
      { id: 5, image: require('./pics/image5.jpeg'), matched: false, isFlipped: false },
      { id: 6, image: require('./pics/image6.jpeg'), matched: false, isFlipped: false },
      { id: 7, image: require('./pics/image7.jpeg'), matched: false, isFlipped: false },
      { id: 8, image: require('./pics/image8.jpeg'), matched: false, isFlipped: false },
      { id: 9, image: require('./pics/image9.jpeg'), matched: false, isFlipped: false },
      { id: 10, image: require('./pics/image10.jpeg'), matched: false, isFlipped: false },
    ].reduce((acc, card) => ([...acc, card, { ...card }]), []); // Duplicate each card for matching

    // Difficulty levels and the range of card IDs they include
    const difficultyLevels = {
      easy: [1, 4], // IDs 1 to 4
      intermediate: [1, 6], // IDs 1 to 6
      difficult: [1, 10], // IDs 1 to 10
    };

    // Filter initialCardsData based on difficulty
    const initialCardsData = allCardsData.filter(card => card.id >= difficultyLevels[difficulty][0] && card.id <= difficultyLevels[difficulty][1]);

  //Start timer (adapted from Mines Wept)
  const startTimer = () => {
    if (timerRef.current !== null) return;
    setTimer(0);
    timerRef.current = setInterval(() => {
      setTimer(t => t + 1);
      setBaseTimeScore(score => score - 1);
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
    //newGame();
    newGame('easy'); // Set the new game to easy on first load
    //startTimer();    // Start the timer immediately
    
    // Cleanup function to stop the timer when the component unmounts
    return () => stopTimer(); 
  }, []); // Empty dependency array means this runs once on mount

  // Shuffle cards
  const shuffleCards = (cards) => {
    return cards.sort(() => Math.random() - 0.5);
  };

  const [cards, setCards] = useState(shuffleCards(initialCardsData));

  // handleMatch function
  const handleMatch = (selectedCard) => {
    // Find the two cards that match
    const matchedIndices = cards.reduce((indices, card, index) => {
      if (card.id === selectedCard.id) {
        indices.push(index);
      }
      return indices;
    }, []);
  
    // If a pair is found
    if (matchedIndices.length === 2) {
      // Update the matched state of the two cards
      const updatedCards = cards.map((card, index) => {
        if (matchedIndices.includes(index)) {
          return { ...card, matched: true };
        }
        return card;
      });
  
      setCards(updatedCards);
      setMatchedCards(currentMatched => [...currentMatched, matchedIndices[0], matchedIndices[1]]); // matchedCards state only updated if a pair is found
      setRevealScore(currentScore => currentScore + 50); // Add 50 points for the match

      // Vibrate to indicate a match
      Vibration.vibrate(200) // 200ms
    }
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
  const newGame = (difficultySetting = difficulty) => {
    const filteredCards = shuffleCards(
      allCardsData.filter(card =>
        card.id >= difficultyLevels[difficultySetting][0] && card.id <= difficultyLevels[difficultySetting][1]
      ).map(card => ({ ...card, isFlipped: false }))
    );
  
    // Reset everything for a new game
    setFlippedCards([]);
    setMatchedCards([]);
    setTimer(0); // Reset the timer
    setBaseTimeScore(500); // Reset base score
    setRevealScore(0); // Reset reveal score
    setCards(filteredCards); // Set the newly filtered and shuffled cards
  
    startTimer(); // Start the timer for the new game
  };

// Function to change difficulty and reset the game
  const changeDifficulty = (newDifficulty) => {
  stopTimer(); // Stop the current timer
  setDifficulty(newDifficulty); // Update the difficulty state
  newGame(newDifficulty); // Start a new game with the new difficulty
};

  const soundObject = new Audio.Sound();

  // Play win sound
  async function playWinSound() {
    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
      });
      await soundObject.loadAsync(require('./assets/whoopup.mp3'));
      await soundObject.playAsync();
    } catch (error) {
      console.error(error);
    }
  }
  
  //Check for win conditions
  useEffect(() => {
    // Check if all cards are matched
    if (matchedCards.length === initialCardsData.length * 2) {
      stopTimer();
      let final = baseTimeScore + revealScore;
      setFinalScore(final);

            // Check if the final score is higher than the high score
            if (final > highScore) {
              setHighScore(final);
              message = `Congratulations, you won! New high score: ${final}`;
            } else {
              message = `Congratulations, you won! Score: ${final}`;
    }

    // Play win sound together with the alert
    playWinSound();
    Alert.alert('Win', message, [{ text: 'OK', onPress: newGame }]);
    soundObject.unloadAsync();
  }
}, [matchedCards]);

  // Function to show instructions (adapted from Mines Wept)
  const showInstructions = () => {
    Alert.alert("Instructions", instructionsText);
  };

  return (
    <View style={styles.container}>
            <Image
        source={require('./assets/memorymatchlogo.jpeg')} 
        style={styles.logo}
      />
        <View style={styles.buttonContainer}>
          <Button title="Reset" onPress={resetGame} />
          <Button title="How to Play" onPress={showInstructions} />
        </View>

        <View style={styles.difficultyContainer}>
              {Object.keys(difficultyLevels).map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.button,
                  difficulty === level ? styles.selectedButton : {}
                ]}
                onPress={() => changeDifficulty(level)}
              >
                <Text style={styles.buttonText}>{level}</Text>
              </TouchableOpacity>
            ))}
        </View>

      <Text> Current High Score: {highScore}</Text>
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
    marginTop: 20, 
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    //width: '100%', // Ensure the buttons are spaced across the width of the screen
    //marginBottom: 20, // Space between the buttons and the game board
  },
  difficultyContainer: {
    flexDirection: 'row', 
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    //padding: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  selectedButton: {
    backgroundColor: '#004c8c', 
    padding: 10,
    borderRadius: 5,
    margin: 5,
    borderWidth: 2,
    borderColor: '#ffffff', 
  },  
  buttonText: {
    color: 'white',
    fontSize: 16,
    alignItems: 'center',
  },
});

export default App;
