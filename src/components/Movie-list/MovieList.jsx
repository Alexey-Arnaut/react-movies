import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "./movie-list.scss";

import MovieCard from "../Movie-card/MovieCard";

const MovieList = ({ list, category }) => {
  return (
    <div className="movie-list">
      <Swiper slidesPerView="auto" spaceBetween={10} loop={true}>
        {list.map((item, index) => (
          <SwiperSlide key={index}>
            <MovieCard item={item} category={category} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieList;
