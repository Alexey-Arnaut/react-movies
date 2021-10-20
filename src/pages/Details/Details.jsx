import React, { useEffect, useState } from "react";

import axios from "axios";
import { useParams } from "react-router";

import "./details.scss";

import MovieInfo from "../../components/Movie-info/MovieInfo";
import MovieVideos from "../../components/Movie-videos/MovieVideos";
import MoviePerson from "../../components/Movie-person/MoviePerson";
import MovieList from "../../components/Movie-list/MovieList";
import Preloader from "../../components/Preloader/Preloader";

const Details = () => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const { category, id } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0 });
    const getMovieDetails = async () => {
      try {
        setLoading(true);

        const infoRes = await axios.get(
          `https://api.themoviedb.org/3/${category}/${id}?api_key=190eda9df5172483ad9af3e885997915&append_to_response=videos,credits,similar,recommendations&language=ru`
        );

        setLoading(false);

        setMovieDetails(infoRes.data);
      } catch (err) {
        console.log("error" + " " + err);
      }
    };
    getMovieDetails();
  }, [category, id]);

  return (
    <>
      {loading && <Preloader />}
      {movieDetails && (
        <>
          <MovieInfo details={movieDetails} category={category} />
          {movieDetails.credits.cast.length > 0 && (
            <section className="section details person">
              <h2 className="details__title">Актёрский состав</h2>
              <MoviePerson details={movieDetails.credits.cast} />
            </section>
          )}
          {movieDetails.credits.crew.length > 0 && (
            <section className="section details person">
              <h2 className="details__title">Съёмочный состав</h2>
              <MoviePerson details={movieDetails.credits.crew} />
            </section>
          )}
          {movieDetails.videos.results.length > 0 && (
            <section className="section details videos">
              <h2 className="details__title">
                {movieDetails.videos.results.length > 1
                  ? "Трейлеры"
                  : "Трейлер"}
              </h2>
              <MovieVideos details={movieDetails.videos} />
            </section>
          )}
          {movieDetails.similar.results.length > 0 && (
            <section className="section details similar">
              <h2 className="details__title">Похожие фильмы</h2>
              <MovieList
                list={movieDetails.similar.results}
                category={category}
              />
            </section>
          )}
          {movieDetails.recommendations.results.length > 0 && (
            <section className="section details recommendations">
              <h2 className="details__title">Рекомендуемые фильмы</h2>
              <MovieList
                list={movieDetails.recommendations.results}
                category={category}
              />
            </section>
          )}
        </>
      )}
    </>
  );
};

export default Details;
