import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const PlayPauseButton = ({ onPlayPausePress, isPlaying }) => {

  return (
    <TouchableOpacity style={styles.button} onPress={onPlayPausePress}>
      <View>
        <Text style={styles.buttonText}>{isPlaying ? 'Pause' : 'Play'}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: 'white',
  },
});

export default PlayPauseButton;

