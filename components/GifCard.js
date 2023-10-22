import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { useTheme } from '../context/ThemeContext';
import DownloadGifButton from './DownloadGifButton';
import ShareButton from './ShareButton';
import PlayPauseButton from './PlayPauseButton';
//import LottieView from 'lottie-react-native';

const GifCard = ({ item }) => {
  const { textColor } = useTheme();

  const [isPlaying, setIsPlaying] = React.useState(false);

  //const lottieRef = useRef(null);

  const playPauseToggle = () => {
    setIsPlaying(!isPlaying);
    // if (lottieRef.current) {
    //   if (isPlaying) {
    //     lottieRef.current.pause(); // Pause the animation
    //   } else {
    //     lottieRef.current.play(); // Play the animation
    //   }
    //   setIsPlaying(!isPlaying);
    // }
  };


  return (
    <View style={styles.container}>
      <Image source={{ uri: item.images.fixed_height.url }} style={styles.gifImage} />
      <View style={styles.gifDetails}>
        <Text style={[styles.text, { color: textColor }]}>{item.title}</Text>
      </View>
      <View style={styles.bottomButtons}>
        <PlayPauseButton onPlayPausePress={playPauseToggle} isPlaying={isPlaying} />
        <DownloadGifButton item={item} />
        <ShareButton item={item} />
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },

  gifImage: {
    width: '100%',
    height: 150,
  },
  gifDetails: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});


export default GifCard




// return (
//   <View>
//     <LottieView
//       ref={lottieRef} // Set the ref to the LottieView component
//       source={{ uri: item.images.fixed_height.url }} // GIF source
//       autoPlay={false}
//       loop={true}
//       style={styles.gifImage}
//     />
//     <View style={styles.gifDetails}>
//       <Text style={[styles.text, { color: textColor }]}>{item.title}</Text>
//     </View>
//     <PlayPauseButton onPlayPausePress={playPauseToggle} isPlaying={isPlaying} />
//     <DownloadGifButton item={item} />
//     <ShareButton item={item} />
//   </View>
// );
