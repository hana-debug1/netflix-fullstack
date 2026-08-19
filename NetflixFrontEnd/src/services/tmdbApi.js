import axios from "axios";

const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  timeout: 10000,
});

export default tmdbApi;
