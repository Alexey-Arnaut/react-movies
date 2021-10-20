import React, { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";

import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "./slider.scss";

import Modal from "../Modal/Modal";
import { Link } from "react-router-dom";

const Slider = ({ sliderItems, category }) => {
  const [active, setActive] = useState(false);
  const [trailer, setTrailer] = useState(null);

  const showTrailer = async (id) => {
    setActive(true);

    try {
      const trailerRes = await axios.get(
        `https://api.themoviedb.org/3/${category}/${id}/videos?api_key=190eda9df5172483ad9af3e885997915&language=ru`
      );

      setTrailer(trailerRes.data.results);
    } catch (err) {
      console.log("error " + err);
    }
  };

  return (
    <section className="section slider">
      <Swiper slidesPerView={1}>
        {sliderItems.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="sldier__item"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${slide.backdrop_path})`,
              }}
            >
              <div className="sldier__item-content content">
                <h1 className="sldier__item-title title">
                  {slide.title || slide.name}
                </h1>
                <p className="sldier__item-overview overview">
                  {slide.overview}
                </p>
                <div
                  className="slider__item-average average"
                  style={{
                    backgroundColor:
                      slide.vote_average > 7 ? "#1BC47D" : "#E44F4F",
                  }}
                >
                  <div className="slider__item-icon icon">
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
                  <p className="slider__item-num num">
                    {slide.vote_average.toFixed(1)}
                  </p>
                </div>
                <div className="sldier__item-buttons">
                  <button
                    className="sldier__item-button"
                    onClick={() => showTrailer(slide.id)}
                  >
                    Трейлер
                  </button>
                  <Link
                    className="sldier__item-button"
                    to={`/${category}/${slide.id}`}
                  >
                    Подробнее
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Modal closeModal={() => setActive(false)} active={active}>
        <>
          {trailer && (
            <>
              {trailer.length > 0 ? (
                <iframe
                  className="modal__trailer"
                  width="100%"
                  height="300px"
                  src={`https://www.youtube.com/embed/${trailer[0].key}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <>
                  <h2 className="modal__title">Ничего нет</h2>
                  <p className="modal__subtitle">
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
                </>
              )}
            </>
          )}
        </>
      </Modal>
    </section>
  );
};

export default Slider;
