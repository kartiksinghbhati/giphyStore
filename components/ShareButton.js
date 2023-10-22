// ShareButton.js
import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Share } from 'react-native';

const ShareButton = (item) => {


    const customShare = async (item) => {

        try{
            const shareResponse = await Share.share({
              message: ('GIFs' + '\n'+ item.url),
          });

            if(shareResponse.action === Share.sharedAction){
              if(shareResponse.activityType){
                console.log("share with activity type of : ", shareResponse.activityType);
              }
              else{
                console.log("shared");
              }
            } else if(shareResponse.action === Share.dismissedAction){
              console.log("dismissed");
            }


        } catch(error){
            console.log('Error : ', error);
        }
    }



  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => customShare(item)}
    >
      <Text style={styles.buttonText}>Share</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'lightgreen',
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: 'white',
  },
});

export default ShareButton;
