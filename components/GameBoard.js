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
  setMatchedCards,
  difficulty,
}) => {

  // Function to handle flipping a card
  const flipCard = (index) => {
    const card = cards[index];

    // Check if we should flip back the card
    if (flippedCards.includes(index)) {
      setFlippedCards(flippedCards.filter(i => i !== index));
      return;
    }

    // Check if we should match cards
    if (flippedCards.length === 1) {
      const firstCardIndex = flippedCards[0];
      const firstCard = cards[firstCardIndex];
      if (firstCard.id === card.id) {
        setMatchedCards([...matchedCards, firstCardIndex, index]);
        onMatch(card); // This function can be used to handle score updates or any other match logic
      }
      setFlippedCards([]); // Reset flipped cards
    } else {
      setFlippedCards([index]); // Flip the new card
    }
  };

  // Adjust the number of cards per row based on difficulty
  const cardConfig = {
    easy: { rows: 3, cols: 4 },
    intermediate: { rows: 4, cols: 4 },
    difficult: { rows: 4, cols: 5 },
  };

  const { rows, cols } = cardConfig[difficulty];

  // Calculate the card size
  const screenWidth = Dimensions.get('window').width;
  const cardMargin = 5;
  const cardSize = (screenWidth - cardMargin * 2 * (cols + 1)) / cols;

  return (
    <View style={styles.board}>
      {cards.map((card, index) => (
        <Card
          key={index}
          image={card.image}
          onPress={() => onCardPress(index)}
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
