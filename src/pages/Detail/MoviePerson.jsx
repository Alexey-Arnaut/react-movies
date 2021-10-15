import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

const Person = ({ movieInfoPerson, title }) => {

  return (
    <>
      {movieInfoPerson.length > 0 ? (
        <section className="section person">
          <>
            <h2 className="person__title">
              {title} <span>{movieInfoPerson.length}</span>
            </h2>
            <Swiper grabCursor={true} spaceBetween={0} slidesPerView={"auto"}>
              {movieInfoPerson.map((person, index) => (
                <SwiperSlide key={index}>
                  <div
                    className={`person__img ${
                      person.profile_path !== null ? "" : "person__img-none"
                    }`}
                  >
                    {person.profile_path !== null ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                        alt=""
                      />
                    ) : (
                      <svg
                        width="180"
                        height="200"
                        viewBox="0 0 448 512"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M224 256C294.7 256 352 198.7 352 128C352 57.3 294.7 0 224 0C153.3 0 96 57.3 96 128C96 198.7 153.3 256 224 256ZM313.6 288H296.9C274.7 298.2 250 304 224 304C198 304 173.4 298.2 151.1 288H134.4C60.2 288 0 348.2 0 422.4V464C0 490.5 21.5 512 48 512H400C426.5 512 448 490.5 448 464V422.4C448 348.2 387.8 288 313.6 288Z"
                          fill="#9B9B9B"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="person__name">{person.name}</div>
                  {person.department && (
                    <div className="person__department person__text">
                      {person.department}
                    </div>
                  )}
                  {person.job && (
                    <div className="person__job person__text">{person.job}</div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        </section>
      ) : (
        ""
      )}
    </>
  );
};

export default Person;
