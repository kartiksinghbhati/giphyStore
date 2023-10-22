// PlayPauseButton.js
import React from 'react';
import { Text, StyleSheet, Platform, TouchableOpacity, PermissionsAndroid, Button } from 'react-native';

const DownloadGifButton = ({ item }) => {

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message:
            'Application needs access to your storage' +
            'so you can download File.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the Stroage');
      } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        
        console.log('Permission Denied - Never ask again');
        Linking.openSettings();
      }
      else {
        console.log('Permission Denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => requestCameraPermission()}
    >
      <Text style={styles.buttonText}>Download</Text>
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

export default DownloadGifButton;
