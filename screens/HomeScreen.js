// HomeScreen.js
import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { fetchTrendingGIFs } from '../services/GiphyService';
import AppBar from '../components/AppBar';
import TrendingGIFs from '../components/GifGrid';



const HomeScreen = () => {

  const { backgroundColor, textColor } = useTheme();

  const [trendingGIFs, setTrendingGIFs] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);

  const loadData = useCallback(() => {
    if (!isLoading) {
      setIsLoading(true);
      fetchTrendingGIFs(offset + 10) // Fetch the next set of GIFs (adjust limit as needed)
        .then((gifs) => {
          setTrendingGIFs((prevGIFs) => [...prevGIFs, ...gifs]);
          setOffset((prevOffset) => prevOffset + 10);
        })
        .catch((error) => console.error(error))
        .finally(() => setIsLoading(false));
    }
  }, [offset]);

  useEffect(() => {
    
    loadData();

  }, []);


  const loadMoreData = useCallback(() => {
    if (!isRefreshing) {
      setIsRefreshing(true);
      fetchTrendingGIFs(offset + 10) // Fetch the next set of GIFs (adjust limit as needed)
        .then((gifs) => {
          setTrendingGIFs((prevGIFs) => [...prevGIFs, ...gifs]);
          setOffset((prevOffset) => prevOffset + 10);
        })
        .catch((error) => console.error(error))
        .finally(() => setIsRefreshing(false));
    }
  }, [isRefreshing, offset]);


  return (
    <View style={[styles.container, { backgroundColor }]}>
      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : (
        <>
          <AppBar title="Trending GIFs"/>
          <TrendingGIFs GIFs={trendingGIFs} loadMoreData={loadMoreData} isRefreshing={isRefreshing}/>
        </>
      )}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  loader: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
  }
});

export default HomeScreen;
