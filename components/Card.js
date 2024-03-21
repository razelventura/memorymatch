// Card.js
import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const Card = ({ imageUri, onPress, size }) => {
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

  return (
    <TouchableOpacity onPress={onPress} style={cardStyle}>
      <Image source={{ uri: imageUri }} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
    </TouchableOpacity>
  );
};

export default Card;
