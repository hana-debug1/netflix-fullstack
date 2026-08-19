import React from "react";
import { BsPlusCircle } from "react-icons/bs";
import { FaCirclePlay } from "react-icons/fa6";
import { GoCheckCircleFill } from "react-icons/go";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import styles from "./MovieCard.module.css";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

function MovieCard({ movie }) {
  if (!movie?.poster_path) {
    return null;
  }

  const title = movie.title || movie.name || "Netflix title";

  return (
    <article className={styles.cardWrapper}>
      <img
        className={styles.poster}
        src={`${IMAGE_BASE}${movie.poster_path}`}
        alt={title}
        loading="lazy"
      />

      <div className={styles.hoverCard}>
        <img
          className={styles.hoverImage}
          src={`${IMAGE_BASE}${movie.poster_path}`}
          alt=""
          loading="lazy"
        />

        <div className={styles.badge}>Recently Added</div>

        <div className={styles.buttonsRow}>
          <FaCirclePlay className={styles.circleButton} size={40} />
          <BsPlusCircle className={styles.circleButton} size={40} />
          <GoCheckCircleFill className={styles.circleButton} size={40} />
          <IoIosArrowDropdownCircle className={styles.circleButtonSmall} size={40} />
        </div>

        <div className={styles.metaRow}>
          <span className={styles.tag}>U/A 16+</span>
          <span className={styles.tag}>{movie.media_type === "tv" ? "TV" : "Movie"}</span>
          <span className={styles.tag}>HD</span>
        </div>

        <div className={styles.genres}>Popular • Netflix • Recommended</div>
      </div>
    </article>
  );
}

export default MovieCard;
