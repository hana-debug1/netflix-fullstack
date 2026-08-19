import React, { useEffect, useState } from "react";
import SlideShow from "../SlideShow/SlideShow";
import tmdbApi from "../../services/tmdbApi";
import tmdbRequests from "../../config/tmdbRequests";
import styles from "./DisplayRow.module.css";

const initialRows = {
  trending: [],
  netflixOriginals: [],
  topRated: [],
  action: [],
  comedy: [],
  horror: [],
  romance: [],
  documentaries: [],
};

function DisplayRow() {
  const [movies, setMovies] = useState(initialRows);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [
          trendingRes,
          netflixRes,
          topRatedRes,
          actionRes,
          comedyRes,
          horrorRes,
          romanceRes,
          documentaryRes,
        ] = await Promise.all([
          tmdbApi.get(tmdbRequests.trending),
          tmdbApi.get(tmdbRequests.netflixOriginals),
          tmdbApi.get(tmdbRequests.topRated),
          tmdbApi.get(tmdbRequests.action),
          tmdbApi.get(tmdbRequests.comedy),
          tmdbApi.get(tmdbRequests.horror),
          tmdbApi.get(tmdbRequests.romance),
          tmdbApi.get(tmdbRequests.documentaries),
        ]);

        setMovies({
          trending: trendingRes.data.results || [],
          netflixOriginals: netflixRes.data.results || [],
          topRated: topRatedRes.data.results || [],
          action: actionRes.data.results || [],
          comedy: comedyRes.data.results || [],
          horror: horrorRes.data.results || [],
          romance: romanceRes.data.results || [],
          documentaries: documentaryRes.data.results || [],
        });
      } catch (error) {
        console.error("Unable to load movie rows:", error.message);
        setErrorMessage("Unable to load movies right now.");
      }
    };

    fetchMovies();
  }, []);

  return (
    <main className={styles.mainWrapper}>
      {errorMessage && <p className="px-8 py-4 text-red-400">{errorMessage}</p>}

      <SlideShow title="Trending Now" movies={movies.trending} />
      <SlideShow title="Netflix Originals" movies={movies.netflixOriginals} />
      <SlideShow title="Top Rated" movies={movies.topRated} />
      <SlideShow title="Action Movies" movies={movies.action} />
      <SlideShow title="Comedies" movies={movies.comedy} />
      <SlideShow title="Horror Movies" movies={movies.horror} />
      <SlideShow title="Romance Movies" movies={movies.romance} />
      <SlideShow title="Documentaries" movies={movies.documentaries} />
    </main>
  );
}

export default DisplayRow;
