import React, { useState, useEffect } from "react";

import { useParams } from "react-router";
import axios from "axios";

import "./catalog.scss";

import Slider from "../../components/Slider/Slider";
import MovieCard from "../../components/Movie-card/MovieCard";
import Preloader from "../../components/Preloader/Preloader";

const Catalog = () => {
  const [movies, setMovies] = useState(null);
  let [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const { category } = useParams();

  useEffect(() => {
    const getMovies = async () => {
      try {
        window.scrollTo({ top: 0 });
        setLoading(true);

        const moviesRes = await axios.get(
          `https://api.themoviedb.org/3/${category}/popular?api_key=190eda9df5172483ad9af3e885997915&language=ru&page=${page}`
        );

        setLoading(false);

        setMovies(moviesRes.data.results);
        setTotalPage(moviesRes.data.total_pages);
      } catch (err) {
        console.log("error " + err);
      }
    };
    getMovies();
  }, [category]);

  const showMore = async () => {
    try {
      setPage(++page);

      const moviesRes = await axios.get(
        `https://api.themoviedb.org/3/${category}/popular?api_key=190eda9df5172483ad9af3e885997915&language=ru&page=${page}`
      );

      setMovies([...movies, ...moviesRes.data.results]);
    } catch (err) {
      console.log("error " + err);
    }
  };

  return (
    <>
      {loading && <Preloader />}
      {movies && (
        <>
          <Slider sliderItems={movies} category={category} />
          <section className="section movies">
            <h2 className="movies__title">
              {category === "movie" ? "Фильмы" : "Сериалы"}
            </h2>
            <div className="movies__list">
              {movies.map((movie, index) => (
                <MovieCard key={index} item={movie} category={category} />
              ))}
            </div>
            {totalPage >= page && (
              <button className="movies___button" onClick={() => showMore()}>
                Загрузить еще
              </button>
            )}
          </section>
        </>
      )}
    </>
  );
};

export default Catalog;
