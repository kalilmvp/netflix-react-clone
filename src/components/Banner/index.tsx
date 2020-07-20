import React, { useState, useEffect, useCallback } from "react";

import "./styles.css";
import api from "../../services/api";
import requests from "../../services/request";

interface IMovieData {
  id: number;
  name: string;
  backdrop_path: string;
  overview: string;
}

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/original/";

const Banner: React.FC = () => {
  const [movie, setMovie] = useState({} as IMovieData);

  const truncate = useCallback((value: string, size: number) => {
    return value?.length > size ? value.substr(0, size - 1) + " ..." : value;
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await api.get(requests.fetchNetflixOriginals);
      const results = response.data.results;
      const randomMovie =
        results[Math.floor(Math.random() * results.length - 1)];
      setMovie({
        id: randomMovie.id,
        name: randomMovie.name ? randomMovie.name : randomMovie.original_title,
        backdrop_path: BASE_IMAGE_URL.concat(randomMovie.backdrop_path),
        overview: randomMovie.overview,
      });
    }

    fetchData();
  }, []);

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${movie.backdrop_path})`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__content">
        {/** title */}
        <h1 className="banner__title">{movie.name}</h1>

        {/** div > 2 buttons ( play and my list) */}
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">Add to My List</button>
        </div>

        {/** description */}
        <h1 className="banner__description">{truncate(movie.overview, 150)}</h1>
      </div>

      <div className="banner--fadeBottom"></div>
    </header>
  );
};

export default Banner;
