import React, { useEffect, useState } from "react";

import axios from "axios";

import "./detail.scss";

import MovieInfo from "./MovieInfo";
import Person from "./MoviePerson";
import MovieTrailer from "./MovieTrailer";
import MovieList from "../../components/Movie-list/MovieList";
import Loader from "../../components/Loader/Loader";

const Detail = ({ movieId, getId }) => {
  const [movieInfo, setMovieInfo] = useState(null);
  const [movieInfoPerson, setMovieInfoPerson] = useState(null);
  const [movieTrailer, setMovieTrailer] = useState(null);
  const [movieSimilar, setMovieSimilar] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    const getMovieInfo = async () => {
      setIsLoading(true);
      const movieInfoRes = await axios.get(
        `https://api.themoviedb.org/3/${movieId[1]}/${movieId[0]}?api_key=190eda9df5172483ad9af3e885997915&language=ru`
      );
      const movieInfoPersonRes = await axios.get(
        `https://api.themoviedb.org/3/${movieId[1]}/${movieId[0]}/credits?api_key=190eda9df5172483ad9af3e885997915&language=ru`
      );
      const movieTrailerRes = await axios.get(
        `https://api.themoviedb.org/3/${movieId[1]}/${movieId[0]}/videos?api_key=190eda9df5172483ad9af3e885997915&language=ru`
      );
      const movieSimilarRes = await axios.get(
        `https://api.themoviedb.org/3/${movieId[1]}/${movieId[0]}/similar?api_key=190eda9df5172483ad9af3e885997915&language=ru&page=1`
      );

      setIsLoading(false);

      setMovieInfo(movieInfoRes.data);
      setMovieInfoPerson(movieInfoPersonRes.data);
      setMovieTrailer(movieTrailerRes.data);
      setMovieSimilar(movieSimilarRes.data);
    };
    getMovieInfo();
  }, [movieId]);

  return (
    <>
      {isLoading ? (
        <Loader isLoading={isLoading} />
      ) : (
        <>
          {movieInfo && <MovieInfo movieInfo={movieInfo} />}
          {movieInfoPerson && (
            <Person
              movieInfoPerson={movieInfoPerson.cast}
              title={"Актёрский состав"}
            />
          )}
          {movieInfoPerson && (
            <Person
              movieInfoPerson={movieInfoPerson.crew}
              title={"Съёмочный состав"}
            />
          )}
          {movieTrailer && <MovieTrailer movieTrailer={movieTrailer.results} />}
          {movieSimilar && (
            <MovieList
              moviesList={movieSimilar}
              getId={getId}
              category={movieId[1]} 
              title='Похожие'
            />
          )}
        </>
      )}
    </>
  );
};

export default Detail;
