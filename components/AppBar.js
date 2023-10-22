//AppBar.js
import React from 'react';
import { View, Text, StyleSheet  } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const AppBar = ({title}) => {
 const { textColor } = useTheme();
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: textColor }]}>
      {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 10,
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold', 
      
    },
  });

export default AppBar;
