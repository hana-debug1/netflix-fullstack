import React from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "../MovieCard/MovieCard";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./SlideShow.module.css";

function SlideShow({ title, movies }) {
  if (!movies?.length) {
    return null;
  }

  return (
    <section>
      <h2 className={styles.title}>{title}</h2>

      <div className={styles.Row}>
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={10}
          slidesPerView={1.6}
          breakpoints={{
            480: { slidesPerView: 2.4 },
            768: { slidesPerView: 3.4 },
            1024: { slidesPerView: 4.5 },
            1280: { slidesPerView: 5.8 },
          }}
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <MovieCard movie={movie} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default SlideShow;
