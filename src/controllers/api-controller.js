// API key
// b0574b4adcec6022cde1a05e31ff0812

// Token
// eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMDU3NGI0YWRjZWM2MDIyY2RlMWEwNWUzMWZmMDgxMiIsInN1YiI6IjY0Nzg1ODk3MGUyOWEyMDBhNjVlZTliYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LqRhvpUfAdXkzh0QdqReCBwm8cN_jLQcyKFyo2kwbME

// Docs
// https://developer.themoviedb.org/docs

import axios from 'axios';

const API_KEY = 'b0574b4adcec6022cde1a05e31ff0812';
const BASE_URL = 'https://api.themoviedb.org/3/';

const request = {
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
};

export default async function getMovies(endpoint = '', options = {}) {
  request.params = { ...request.params, ...options };
  try {
    const { data } = await axios.get(endpoint, request);
    return data;
  } catch (error) {
    throw error;
  }
}
