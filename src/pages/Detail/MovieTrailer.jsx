import React from "react";

const MovieTrailer = ({ movieTrailer }) => {
  return (
    <>
      {movieTrailer.length > 0 ? (
        <section className="section trailer">
          <h2 className="trailer__title">Трейлеры</h2>
          {movieTrailer.map((trailer, index) => (
            <iframe
              key={index}
              className="trailer__video"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ))}
        </section>
      ) : (
        ""
      )}
    </>
  );
};

export default MovieTrailer;
