import React, { useState, useEffect, useCallback } from "react";

import "./styles.css";
import api from "../../services/api";
import YouTube, { Options } from "react-youtube";
import movieTrailer from "movie-trailer";

interface IRowProps {
  title: string;
  fetchUrl: string;
  isLargeRow?: boolean;
}

interface IMovieData {
  id: number;
  name: string;
  original_title: string;
  poster_path: string;
  backdrop_path: string;
  coverPath: string;
}

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/original/";

const Row: React.FC<IRowProps> = ({ title, fetchUrl, isLargeRow = false }) => {
  const [movies, setMovies] = useState<IMovieData[]>([]);
  const [trailerUrl, setTrailerUrl] = useState<string>("");

  const opts: Options = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };

  useEffect(() => {
    async function fetchData() {
      const response = await api.get(fetchUrl);
      const results = response.data.results;
      setMovies(
        results.map((movie: IMovieData) => {
          return {
            id: movie.id,
            coverPath: `${
              movie.poster_path && movie.backdrop_path
                ? BASE_IMAGE_URL.concat(
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  )
                : "https://lavozdeanza.com/wp-content/uploads/2017/09/netflix-n-chill.jpg"
            }`,
            name: movie.name ? movie.name : movie.original_title,
          };
        })
      );
    }

    fetchData();
  }, [isLargeRow, fetchUrl]);

  const handleClick = useCallback(
    (movie: IMovieData) => {
      if (trailerUrl) {
        setTrailerUrl("");
      } else {
        movieTrailer(movie.name || "")
          .then((resp) => {
            const urlParams = new URLSearchParams(new URL(resp).search);
            const videoId = urlParams.get("v");
            if (videoId) setTrailerUrl(videoId);
          })
          .catch((err) => console.error(err));
      }
    },
    [trailerUrl]
  );

  return (
    <div className="row">
      <h2>{title}</h2>

      {/** Container -> posters */}
      <div className="row__posters">
        {/** many row__poster */}
        {movies.map((movie) => (
          <img
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            key={movie.id}
            src={movie.coverPath}
            alt={movie.name}
            onClick={() => handleClick(movie)}
          />
        ))}
      </div>
      {trailerUrl && (
        <YouTube
          containerClassName="row__youtube"
          videoId={trailerUrl}
          opts={opts}
        />
      )}
    </div>
  );
};

export default Row;
