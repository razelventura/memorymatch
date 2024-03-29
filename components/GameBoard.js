// GameBoard.js
import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Card from './Card';

const GameBoard = ({ 
  cards, 
  onMatch, 
  onCardPress, 
  flippedCards, 
  setFlippedCards, 
  matchedCards, 
  setMatchedCards }) => {

// Function to handle flipping a card
const flipCard = (index) => {
  const card = cards[index];

  // Check if the card is already flipped or matched
  if (flippedCards.includes(index) || matchedCards.includes(index)) {
    return; // Do nothing if the card is already flipped or matched
  }

  // Temporarily add this card to the flippedCards state to show it
  setFlippedCards([...flippedCards, index]);

  // Check if this is the second card being flipped
  if (flippedCards.length === 1) {
    const firstCardIndex = flippedCards[0];
    const firstCard = cards[firstCardIndex];

    // Add a delay to allow the user to see the second card
    setTimeout(() => {
      if (firstCard.id === card.id) {
        // If cards match, add them to matchedCards state
        setMatchedCards([...matchedCards, firstCardIndex, index]);
        onMatch(card); // Handle score updates or any other match logic
      }
      // Whether they match or not, reset flippedCards to empty
      setFlippedCards([]);
    }, 500); // 1000 milliseconds delay before resetting
  }
};


  // Calculate the number of columns and card size based on screen width
  const screenWidth = Dimensions.get('window').width;
  const cardMargin = 5;
  const cardSize = (screenWidth - cardMargin * 2 * 3) / 5; 

  return (
    <View style={styles.board}>
      {cards.map((card, index) => (
        <Card
          key={index}
          image={card.image}
          onPress={() => flipCard(index)}
          size={cardSize}
          isFlipped={flippedCards.includes(index) || matchedCards.includes(index)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    // Add padding if needed
  },
});

export default GameBoard;
