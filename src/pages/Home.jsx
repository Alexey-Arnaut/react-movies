import React, { useState, useEffect, useRef } from "react";

import axios from "axios";
import { Link } from "react-router-dom";

import Slider from "../components/Slider/Slider";
import MovieList from "../components/Movie-list/MovieList";
import SearchMovies from "../components/Search-movies/SearchMovies";
import MovieCard from "../components/Movie-card/MovieCard";
import Preloader from "../components/Preloader/Preloader";

const Home = () => {
  const [sliderItems, setSliderItems] = useState(null);
  const [popularMovies, setPopularMovies] = useState(null);
  const [ratedMovies, setReatedMovies] = useState(null);
  const [popularTv, setPopularTv] = useState(null);
  const [ratedTv, setReatedTv] = useState(null);
  const [index, setIndex] = useState(1);
  const [foundMovies, setFoundMovies] = useState(null);
  let [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [category, setCategory] = useState("movie");
  const [value, setValue] = useState("");
  const inputRef = useRef();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getList = async () => {
      try {
        setLoading(true);

        const sliderItemsRes = await axios.get(
          "https://api.themoviedb.org/3/movie/now_playing?api_key=190eda9df5172483ad9af3e885997915&language=ru"
        );
        const popularMoviesRes = await axios.get(
          "https://api.themoviedb.org/3/movie/popular?api_key=190eda9df5172483ad9af3e885997915&language=ru"
        );
        const ratedMoviesRes = await axios.get(
          "https://api.themoviedb.org/3/movie/top_rated?api_key=190eda9df5172483ad9af3e885997915&language=ru"
        );
        const popularTvRes = await axios.get(
          "https://api.themoviedb.org/3/tv/popular?api_key=190eda9df5172483ad9af3e885997915&language=ru"
        );
        const ratedTvRes = await axios.get(
          "https://api.themoviedb.org/3/tv/top_rated?api_key=190eda9df5172483ad9af3e885997915&language=ru"
        );

        setLoading(false);

        setSliderItems(sliderItemsRes.data.results);
        setPopularMovies(popularMoviesRes.data.results);
        setReatedMovies(ratedMoviesRes.data.results);
        setPopularTv(popularTvRes.data.results);
        setReatedTv(ratedTvRes.data.results);
      } catch (err) {
        console.log("error " + err);
      }
    };
    getList();
  }, []);

  const getMovies = async (category) => {
    try {
      if (value.trim().length > 0) {
        setLoading(true);
        const foundMoviesRes = await axios.get(
          `https://api.themoviedb.org/3/search/${category}?api_key=190eda9df5172483ad9af3e885997915&language=ru&include_adult=false&query=${value}&page=${page}`
        );
        setLoading(false);
        setFoundMovies(foundMoviesRes.data.results);
        setTotalPage(foundMoviesRes.data.total_pages);
      } else {
        inputRef.current.classList.add("error");

        setTimeout(() => {
          inputRef.current.classList.remove("error");
        }, 1000);
      }
    } catch (err) {
      console.log("error " + err);
    }
  };

  useEffect(() => {
    if (index === 1) {
      setCategory("movie");
    } else {
      setCategory("tv");
    }
  }, [index, category]);

  const showMore = async () => {
    try {
      setPage(++page);

      const foundMoviesRes = await axios.get(
        `https://api.themoviedb.org/3/search/${category}?api_key=190eda9df5172483ad9af3e885997915&language=ru&include_adult=false&query=${value}&page=${page}`
      );

      setFoundMovies([...foundMovies, ...foundMoviesRes.data.results]);
    } catch (err) {
      console.log("error " + err);
    }
  };

  return (
    <>
      {loading && <Preloader />}
      {sliderItems && <Slider sliderItems={sliderItems} category="movie" />}
      {popularMovies && (
        <SearchMovies
          popularMovies={popularMovies[2]}
          foundMovies={foundMovies}
          setFoundMovies={setFoundMovies}
          index={index}
          setIndex={setIndex}
          getMovies={getMovies}
          value={value}
          setValue={setValue}
          inputRef={inputRef}
          category={category}
        />
      )}
      {foundMovies !== null ? (
        <section className="section found-movies">
          {foundMovies.length > 0 && foundMovies ? (
            <>
              <div className="found-lists">
                {foundMovies.map((movie, index) => (
                  <MovieCard key={index} item={movie} category={category} />
                ))}
              </div>
              {totalPage > 1 && totalPage >= page ? (
                <button className="found-movies__more" onClick={showMore}>
                  Показать еще
                </button>
              ) : null}
            </>
          ) : (
            <div className="found-movies-no">
              <h2 className="found-movies__title">
                Нет {category === "movie" ? "фильмов" : "сериалов"} по данному
                запросу.
              </h2>
              <p className="found-movies__subtitle">
                <svg
                  width="83"
                  height="80"
                  viewBox="0 0 83 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M82.0077 40C82.0077 62 64.0077 80 42.0077 80C20.0077 80 2.00772 62 2.00772 40C2.00772 18 20.0077 0 42.0077 0C64.0077 0 82.0077 18 82.0077 40Z"
                    fill="#FFCA28"
                  />
                  <path
                    d="M11.4077 29.6001C10.8077 27.4001 10.6077 25.6001 10.8077 24.2001C11.0077 22.8001 11.6077 21.2001 12.6077 19.6001C13.6077 18.0001 14.4077 16.6001 14.6077 15.8001C14.8077 15.0001 14.8077 14.0001 14.6077 13.2001C14.0077 10.4001 12.4077 9.40008 10.0077 10.2001C8.80773 10.4001 8.00774 11.0001 7.60774 12.0001C7.00774 12.8001 7.00773 14.0001 7.20773 15.2001L0.407734 17.0001C-0.392266 14.0001 0.00773442 11.4001 1.40773 9.20008C2.80773 7.00008 5.20773 5.40008 8.60773 4.60008C12.0077 3.60008 14.8077 3.80008 17.0077 4.80008C19.2077 6.00008 20.8077 8.00008 21.6077 10.8001C22.0077 12.2001 22.0077 13.4001 21.8077 14.8001C21.6077 16.2001 20.8077 17.8001 19.8077 19.6001L18.2077 22.0001C17.4077 23.4001 17.0077 25.0001 17.2077 26.6001L17.4077 28.0001L11.4077 29.6001ZM12.8077 37.0001C12.6077 36.0001 12.6077 35.0001 13.2077 34.2001C13.8077 33.4001 14.6077 32.8001 15.6077 32.4001C16.8077 32.0001 17.8077 32.2001 18.6077 32.6001C19.4077 33.0001 20.0077 33.8001 20.4077 34.8001C20.6077 35.8001 20.6077 36.8001 20.0077 37.6001C19.4077 38.4001 18.6077 39.0001 17.4077 39.4001C16.2077 39.8001 15.2077 39.6001 14.4077 39.2001C13.6077 38.8001 13.0077 38.0001 12.8077 37.0001Z"
                    fill="#F44336"
                  />
                  <path
                    d="M44.0077 34C44.0077 38.4 40.4077 42 36.0077 42C31.6077 42 28.0077 38.4 28.0077 34C28.0077 29.6 31.6077 26 36.0077 26C40.4077 26 44.0077 29.6 44.0077 34Z"
                    fill="#6D4C41"
                  />
                  <path
                    d="M36.0077 31C36.0077 32.6 34.6077 34 33.0077 34C31.4077 34 30.0077 32.6 30.0077 31C30.0077 29.4 31.4077 28 33.0077 28C34.6077 28 36.0077 29.4 36.0077 31Z"
                    fill="white"
                  />
                  <path
                    d="M72.0077 34C72.0077 38.4 68.4077 42 64.0077 42C59.6077 42 56.0077 38.4 56.0077 34C56.0077 29.6 59.6077 26 64.0077 26C68.4077 26 72.0077 29.6 72.0077 34Z"
                    fill="#6D4C41"
                  />
                  <path
                    d="M64.0077 31C64.0077 32.6 62.6077 34 61.0077 34C59.4077 34 58.0077 32.6 58.0077 31C58.0077 29.4 59.4077 28 61.0077 28C62.6077 28 64.0077 29.4 64.0077 31Z"
                    fill="white"
                  />
                  <path
                    d="M33.8077 65L30.4077 63C30.6077 62.6 37.2077 52 48.2077 52C56.8077 52 59.8077 58.8 60.0077 59.2L56.4077 60.8C56.4077 60.6 54.2077 56 48.2077 56C39.4077 56 33.8077 65 33.8077 65Z"
                    fill="#B76C09"
                  />
                </svg>
              </p>
            </div>
          )}
        </section>
      ) : (
        <>
          {popularMovies && (
            <section className="section movie-lists">
              <div className="movie-lists-header">
                <h2 className="movie-lists__title">Популярные фильмы</h2>
                <Link className="movie-lists__button" to="/movie">
                  Показать больше
                </Link>
              </div>
              <MovieList list={popularMovies} category="movie" />
            </section>
          )}
          {ratedMovies && (
            <section className="section movie-lists">
              <div className="movie-lists-header">
                <h2 className="movie-lists__title">Лучшие фильмы</h2>
                <Link className="movie-lists__button" to="/movie">
                  Показать больше
                </Link>
              </div>
              <MovieList list={ratedMovies} category="movie" />
            </section>
          )}
          {popularTv && (
            <section className="section movie-lists">
              <div className="movie-lists-header">
                <h2 className="movie-lists__title">Популярные сериалы</h2>
                <Link className="movie-lists__button" to="/tv">
                  Показать больше
                </Link>
              </div>
              <MovieList list={popularTv} category="tv" />
            </section>
          )}
          {ratedTv && (
            <section className="section movie-lists">
              <div className="movie-lists-header">
                <h2 className="movie-lists__title">Лучшие сериалы</h2>
                <Link className="movie-lists__button" to="/tv">
                  Показать больше
                </Link>
              </div>
              <MovieList list={ratedTv} category="tv" />
            </section>
          )}
        </>
      )}
    </>
  );
};

export default Home;
