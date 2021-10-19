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
  let [page, setPage] = useState(null);
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
    setPage(1);
    if (value.trim().length > 0) {
      const foundMoviesRes = await axios.get(
        `https://api.themoviedb.org/3/search/${category}?api_key=190eda9df5172483ad9af3e885997915&language=ru&include_adult=false&query=${value}&page=1`
      );
      setFoundMovies(foundMoviesRes.data.results);
      setTotalPage(foundMoviesRes.data.total_pages);
      console.log(foundMoviesRes.data);
    } else {
      inputRef.current.classList.add("error");

      setTimeout(() => {
        inputRef.current.classList.remove("error");
      }, 1000);
    }
  };

  useEffect(() => {
    if (index === 1) {
      setCategory("movie");
    } else {
      setCategory("tv");
    }
  }, [index, category]);

  const seeMore = async () => {
    setPage(++page);

    const foundMoviesRes = await axios.get(
      `https://api.themoviedb.org/3/search/${category}?api_key=190eda9df5172483ad9af3e885997915&language=ru&include_adult=false&query=${value}&page=${page}`
    );
    setFoundMovies([...foundMovies, ...foundMoviesRes.data.results]);
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
                <button className="found-movies__more" onClick={seeMore}>
                  Показать еще
                </button>
              ) : null}
            </>
          ) : (
            "Ничего нет"
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
