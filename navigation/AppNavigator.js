// AppNavigator.js
import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../context/ThemeContext';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {

  const { toggleTheme, backgroundColor, textColor } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={({ navigation, route }) => ({
        headerTitle: 'ghipyStore',
        headerTitleStyle: {
          color: textColor, // Set the text color
        },
        headerRight: () => {
          if (route.name === 'home') {
            return (
              <View style={{ flexDirection: 'row', marginRight: 16 }}>
                <Ionicons
                  name="ios-search"
                  size={24}
                  color={textColor}
                  style={{ marginRight: 16 }}
                  onPress={() => navigation.navigate('search')}
                />
                <Ionicons
                  name="ios-moon"
                  size={24}
                  color={textColor}
                  onPress={() => toggleTheme()}
                />
              </View>
            );
          } else {
            // Hide the search icon on the search screen
            return (
              <View style={{ flexDirection: 'row', marginRight: 16 }}>
                <Ionicons
                  name="ios-moon"
                  size={24}
                  color={textColor}
                  onPress={() => toggleTheme()}
                />
              </View>
            );
          }
        },
        headerStyle: { backgroundColor }, // Header background color
      })}
    >
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="search" component={SearchScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
