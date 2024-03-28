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

  // Calculate the number of columns and card size based on screen width
  const screenWidth = Dimensions.get('window').width;
  const cardMargin = 5;
  const cardSize = (screenWidth - cardMargin * 2 * 3) / 3; // 3 cards per row TO DO: adjust per difficulty level

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
