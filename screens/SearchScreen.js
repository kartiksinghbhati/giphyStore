import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import { searchGIFs } from '../services/GiphyService'; // Import the searchGIFs function
import SearchGIFs from '../components/GifGrid';
import AppBar from '../components/AppBar';
import { useTheme } from '../context/ThemeContext';

const SearchScreen = () => {

  const { backgroundColor, textColor } = useTheme();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false); // To indicate loading more results
  const [offset, setOffset] = useState(0); // To keep track of the number of results fetched


  // Function to update search results when the query changes
  const performSearch = async (query, newOffset) => {

    setIsLoading(true);
    if (query.trim() === '') {
      setResults([]);
      setQuery('');
      setIsLoading(false);
      return;
    }

    try {
      const data = await searchGIFs(query, newOffset);
      if (newOffset === 0) {
        setResults(data);
      } else {
        setResults((prevResults) => [...prevResults, ...data]);
      }
      setOffset(newOffset);
    } catch (error) {
      console.error('Error searching GIFs:', error);
      setResults([]);
    }

    setIsLoading(false);
    setIsRefreshing(false);
  };

  
  useEffect(() => {
    performSearch(query, 0);
  }, [query]); // Perform search when the query changes


  const loadMoreData = useCallback(() => {
    if (!isRefreshing) {
      setIsRefreshing(true);
      searchGIFs(query, offset + 10) // Fetch the next set of GIFs
        .then((gifs) => {
          setResults((prevGIFs) => [...prevGIFs, ...gifs]);
          setOffset((prevOffset) => prevOffset + 10);
        })
        .catch((error) => console.error(error))
        .finally(() => setIsRefreshing(false));
    }
  }, [isRefreshing, offset]);


  return (
    <View style={[styles.container, { backgroundColor }]}>
      <TextInput
        placeholder="Search"
        value={query}
        onChangeText={(text) => setQuery(text)}
        style={[styles.searchBar, , { color: textColor }]}
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : results.length === 0 ? (
        <View style={styles.nosearch}>
          <AppBar title="No searched GIFs" />
          <Text style={[styles.nosearchtext, , { color: textColor }]}>Search for your favourite GIFs</Text>
        </View>
      ) : (
        <>
          <AppBar title="Searched GIFs" />
          <SearchGIFs GIFs={results} loadMoreData={loadMoreData} isRefreshing={isRefreshing}/>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  nosearch: {
    marginTop: 15,
    marginBottom: 10,
  },
  nosearchtext: {
    marginLeft: 94,
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
});

export default SearchScreen;