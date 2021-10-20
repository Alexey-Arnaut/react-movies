import React, { useEffect, useState } from "react";

import axios from "axios";
import { useParams } from "react-router";

import "./genres.scss";

import MovieCard from "../../components/Movie-card/MovieCard";
import Slider from "../../components/Slider/Slider";

const Credits = () => {
  const [genreMovie, setGenreMovie] = useState(null);
  let [page, setPage] = useState(null);
  const [totalPage, setTotalPage] = useState(0);

  const { category, genre } = useParams();

  useEffect(() => {
    const getGenreMovie = async () => {
      try {
        setPage(1);
        const genreMovieRes = await axios.get(
          `https://api.themoviedb.org/3/discover/${category}?api_key=190eda9df5172483ad9af3e885997915&language=ru&with_genres=${genre}`
        );
        setGenreMovie(genreMovieRes.data.results);
        setTotalPage(genreMovieRes.data.total_pages);
      } catch (err) {
        console.log("error " + err);
      }
    };
    getGenreMovie();
  }, []);

  const showMore = async () => {
    setPage(++page);

    const genreMovieRes = await axios.get(
      `https://api.themoviedb.org/3/discover/${category}?api_key=190eda9df5172483ad9af3e885997915&language=ru&with_genres=${genre}&page=${page}`
    );
    setGenreMovie([...genreMovie, ...genreMovieRes.data.results]);
  };

  return (
    <>
      {genreMovie && (
        <>
          <Slider sliderItems={genreMovie} category={category} />
          <section className="section genres">
            <div className="genres__list">
              {genreMovie.map((movie, index) => (
                <MovieCard key={index} item={movie} category={category} />
              ))}
            </div>
            {totalPage > 0 && totalPage >= page ? (
              <button onClick={showMore} className="genres__button">
                Показать больше
              </button>
            ) : null}
          </section>
        </>
      )}
    </>
  );
};

export default Credits;
