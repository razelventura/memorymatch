import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const Card = ({ image, onPress, size, isFlipped }) => {
  const cardStyle = {
    width: size,
    height: size,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
  };

  // Image for the back of the card (when not flipped)
  const cardBackImage = require('../assets/cardcover.jpeg');

  // Image for the front of the card (when flipped)
  const cardFrontImage = image; 

  // Determine which image to show based on whether the card is flipped
  const imageSource = isFlipped ? cardFrontImage : cardBackImage;

  return (
    <TouchableOpacity onPress={onPress} style={cardStyle}>
      <Image source={imageSource} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
    </TouchableOpacity>
  );
};

export default Card;
