import React, { useEffect, useState } from "react";

import axios from "axios";
import { useParams } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";

import "./genres.scss";

import MovieCard from "../../components/Movie-card/MovieCard";
import Slider from "../../components/Slider/Slider";
import Preloader from "../../components/Preloader/Preloader";
import { Link } from "react-router-dom";

const Credits = () => {
  const [genreMovie, setGenreMovie] = useState(null);
  const [allGenres, setAllGenres] = useState(null);
  let [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [quantityMovie, setQuantityMovie] = useState(0);

  const { category = "", genre = "" } = useParams();


  useEffect(() => {
    const getGenreMovie = async () => {
      try {
        setLoading(true);

        const genreMovieRes = await axios.get(
          `https://api.themoviedb.org/3/discover/${category}?api_key=190eda9df5172483ad9af3e885997915&language=ru&with_genres=${genre}&page=${page}`
        );
        const allGenresRes = await axios.get(
          `https://api.themoviedb.org/3/genre/${category}/list?api_key=190eda9df5172483ad9af3e885997915&language=ru`
        );

        setLoading(false);

        setGenreMovie(genreMovieRes.data.results);
        setAllGenres(allGenresRes.data.genres);
        setTotalPage(genreMovieRes.data.total_pages);
        setQuantityMovie(genreMovieRes.data.total_results);
      } catch (err) {
        console.log("error " + err);
      }
    };
    getGenreMovie();
  }, [category, genre]);

  const showMore = async () => {
    try {
      setPage(++page);

      const genreMovieRes = await axios.get(
        `https://api.themoviedb.org/3/discover/${category}?api_key=190eda9df5172483ad9af3e885997915&language=ru&with_genres=${genre}&page=${page}`
      );

      setGenreMovie([...genreMovie, ...genreMovieRes.data.results]);
    } catch (err) {
      console.log("error " + err);
    }
  };

  const changeGenres = async (genres) => {
    try {
      window.scrollTo({ top: 0 });

      setLoading(true);

      const genreMovieRes = await axios.get(
        `https://api.themoviedb.org/3/discover/${category}?api_key=190eda9df5172483ad9af3e885997915&language=ru&with_genres=${genres}`
      );

      setLoading(false);

      setGenreMovie(genreMovieRes.data.results);
      setTotalPage(genreMovieRes.data.total_pages);
      setQuantityMovie(genreMovieRes.data.total_results);
    } catch (err) {
      console.log("error " + err);
    }
  };

  return (
    <>
      {loading && <Preloader />}
      {genreMovie && (
        <>
          <Slider sliderItems={genreMovie} category={category} />

          <section className="section genres">
            <h2 className="genres__title">
              Найдено {category === "movie" ? "фильмов" : "сериалов"} :{" "}
              {quantityMovie}
            </h2>
            <div className="genres__items">
              <Swiper slidesPerView="auto" spaceBetween={10}>
                {allGenres &&
                  allGenres.map((genres) => (
                    <SwiperSlide key={genres.id}>
                      <Link
                        to={`/genres/${category}/${genres.id}`}
                        className={`genre__name ${
                          genres.id === +genre ? "genre__name--active" : ""
                        }`}
                        onClick={() => changeGenres(genres.id)}
                      >
                        {genres.name}
                      </Link>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
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
