// Card.js
import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const Card = ({ image, onPress, size }) => {
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

  // Since images are local for now, the source can be directly assigned 
  //TO DO: change this later to uri when database is implemented
  const imageSource = image; // `image` is already a number returned from require

  return (
    <TouchableOpacity onPress={onPress} style={cardStyle}>
      <Image source={imageSource} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
    </TouchableOpacity>
  );
};

export default Card;
