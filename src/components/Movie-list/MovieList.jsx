import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "./movie-list.scss";

const MovieList = ({ moviesList, title, getId, category }) => {
  return (
    <section className="section movie-list">
      <h2 className="movie-list__title">{title}</h2>
      <Swiper grabCursor={true} spaceBetween={10} slidesPerView={"auto"}>
        {moviesList.results && (
          <>
            {moviesList.results.map((movie) => (
              <SwiperSlide
                key={movie.id}
                onClick={() => getId(movie.id, category)}
              >
                <Link to={`/detail/${movie.id}`}>
                  <div className="movie-list__content">
                    <div
                      className={`movie-list__content-img ${
                        movie.poster_path ? "" : "movie-list__content-img-none"
                      }`}
                    >
                      {movie.poster_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt=""
                        />
                      ) : (
                        ""
                      )}
                      <div
                        className="movie-list__content-estimation"
                        style={
                          movie.vote_average > 7
                            ? { backgroundColor: "#1BC47D" }
                            : { backgroundColor: "#E44F4F" }
                        }
                      >
                        {movie.vote_average.toFixed(1)}
                      </div>
                    </div>
                    <h3 className="movie-list__content-title">
                      {movie.title || movie.name}
                    </h3>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </>
        )}
      </Swiper>
    </section>
  );
};

export default MovieList;
