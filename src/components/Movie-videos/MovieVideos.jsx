import React from "react";

import "./movie-videos.scss";

import LazyLoad from "react-lazyload";

const MovieVideos = ({ details }) => {
  return (
    <>
      {details.results.length > 0 && (
        <>
          {details.results.map((trailer, index) => (
            <LazyLoad key={index} debounce={500} once>
              <iframe
                className="videos__trailer"
                width="100%"
                height="600px"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </LazyLoad>
          ))}
        </>
      )}
    </>
  );
};

export default MovieVideos;
