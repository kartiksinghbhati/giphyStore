// GifGrid.js
import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, View, Image, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

import GifCard from './GifCard';


const GifGrid = ({GIFs, loadMoreData, isRefreshing }) => {

  const renderGifItem = ({ item }) => (
    
    <View style={styles.gridItem}>
      <GifCard item={item}/>
    </View>
  );

  return (
    <FlatList
      data={GIFs}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={renderGifItem}
      numColumns={2}
      columnWrapperStyle={styles.row}
      onEndReached={loadMoreData}
      onEndReachedThreshold={0.1}
      ListFooterComponent={
        isRefreshing ? (
          <ActivityIndicator size="small" color="blue" />
        ) : null
      }
    />
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },  
});

export default GifGrid;


// // GifGrid.js
// import React, { useEffect, useState, useCallback } from 'react';
// import { FlatList, View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { fetchTrendingGIFs } from '../services/GiphyService';
// import GifCard from './GifCard';


// const GifGrid = () => {
//   const [trendingGIFs, setTrendingGIFs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [offset, setOffset] = useState(0);

//   const loadMoreData = useCallback(() => {
//     if (!loading) {
//       setLoading(true);
//       fetchTrendingGIFs(offset + 10) // Fetch the next set of GIFs (adjust limit as needed)
//         .then((gifs) => {
//           setTrendingGIFs((prevGIFs) => [...prevGIFs, ...gifs]);
//           setOffset((prevOffset) => prevOffset + 10);
//         })
//         .catch((error) => console.error(error))
//         .finally(() => setLoading(false));
//     }
//   }, [loading, offset]);

//   useEffect(() => {
//     loadMoreData(); // Initial load
//   }, [loadMoreData]);

//   const renderGifItem = ({ item }) => (
    
//     <View style={styles.gridItem}>
//       <GifCard item={item}/>
//     </View>
//   );

//   return (
//     <FlatList
//       data={trendingGIFs}
//       keyExtractor={(item, index) => `${item.id}-${index}`}
//       renderItem={renderGifItem}
//       numColumns={2}
//       columnWrapperStyle={styles.row}
//       onEndReached={loadMoreData}
//       onEndReachedThreshold={0.1}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   gridItem: {
//     flex: 1,
//     margin: 5,
//     padding: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },  
// });

// export default GifGrid;