import React from "react";

import { Link } from "react-router-dom";

import "./movie-info.scss";

const MovieInfo = ({ details, category }) => {
  return (
    <section
      className="section movie-info"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${details.backdrop_path})`,
      }}
    >
      <div className="movie-info-content content">
        <h1 className="movie-info__title title">
          {details.title || details.name}
        </h1>
        {details.overview && (
          <p className="movie-info__overview overview">{details.overview}</p>
        )}
        {details.genres && (
          <div className="movie-info__genres">
            {details.genres.map((genre) => (
              <Link to={`/genres/${category}/${genre.id}`} className="movie-info__genre" key={genre.id}>
                {genre.name}
              </Link>
            ))}
          </div>
        )}
        {details.vote_average >= 0 && (
          <div
            className="movie-info__average average"
            style={{
              backgroundColor: details.vote_average > 7 ? "#1BC47D" : "#E44F4F",
            }}
          >
            <div className="movie-info__average-icon icon">
              <svg
                width="30"
                height="28"
                viewBox="0 0 30 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.3907 0.97401L9.72898 8.21374L1.53647 9.37844C0.0673165 9.58623 -0.521468 11.3524 0.543951 12.364L6.47104 17.9961L5.06918 25.9522C4.81684 27.3903 6.37011 28.4675 7.67104 27.7949L15 24.0383L22.329 27.7949C23.6299 28.462 25.1832 27.3903 24.9308 25.9522L23.529 17.9961L29.4561 12.364C30.5215 11.3524 29.9327 9.58623 28.4635 9.37844L20.271 8.21374L16.6093 0.97401C15.9533 -0.316455 14.0523 -0.332859 13.3907 0.97401Z"
                  fill="white"
                />
              </svg>
            </div>
            <p className="movie-info__average-num num">
              {details.vote_average.toFixed(1)}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MovieInfo;
