//GiphyService.js
const GIPHY_API_KEY = '2o36ywLu8FSVqYrSZot2EmZMAKlYH47H';

export const searchGIFs = async (query, offset) => {
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${query}&offset=${offset}&limit=10`
    );
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error searching GIFs:', error);
    throw error;
  }
};

export const fetchTrendingGIFs = async (offset) => {
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/trending?api_key=${GIPHY_API_KEY}&offset=${offset}&limit=10`
    );
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching trending GIFs:', error);
    throw error;
  }
};
