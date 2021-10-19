import React from "react";

import "./search-movies.scss";

const SearchMovies = ({
  popularMovies,
  foundMovies,
  setFoundMovies,
  index,
  setIndex,
  value,
  setValue,
  getMovies,
  inputRef,
}) => {
  const toogleButton = (index) => {
    setIndex(index);

    if (foundMovies !== null) {
      if (index === 1) {
        getMovies("movie");
      } else {
        getMovies("tv");
      }
    }
  };

  const searchMovie = () => {
    if (index === 1) {
      getMovies("movie");
    } else {
      getMovies("tv");
    }
  };

  const reset = () => {
    setFoundMovies(null);
    setValue("");
    setIndex(1);
  };

  return (
    <section
      className="section search-movies"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${popularMovies.backdrop_path})`,
      }}
    >
      <div className="search-movies__form">
        <h2 className="search-movies__form-title">Найти фильм или сериал</h2>
        <div className="search-movies__form-buttons">
          <button
            className={`search-movies__form-button ${
              index === 1 ? "search-movies__form-button--active" : ""
            }`}
            onClick={() => toogleButton(1)}
          >
            Фильм
          </button>
          <button
            className={`search-movies__form-button ${
              index === 2 ? "search-movies__form-button--active" : ""
            }`}
            onClick={() => toogleButton(2)}
          >
            Сериал
          </button>
        </div>
        <input
          ref={inputRef}
          className="search-movies__form-field"
          type="text"
          placeholder="Поиск"
          onChange={(event) => setValue(event.target.value)}
          value={value}
        />
        <button
          className="search-movies__form-button button-search"
          onClick={searchMovie}
        >
          Найти
        </button>
        {foundMovies !== null && (
          <button
            className="search-movies__form-button button-search"
            onClick={reset}
          >
            Сбросить
          </button>
        )}
      </div>
    </section>
  );
};

export default SearchMovies;
