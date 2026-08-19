import React, { useEffect, useState } from "react";
import { Info, Play } from "lucide-react";
import NetflixBannerLogo from "../../assets/images/logo.png";
import tmdbApi from "../../services/tmdbApi";
import tmdbRequests from "../../config/tmdbRequests";
import styles from "./Banner.module.css";

const BANNER_BASE = "https://image.tmdb.org/t/p/original/";

function Banner() {
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await tmdbApi.get(tmdbRequests.netflixOriginals);
        const results = response.data.results || [];

        if (results.length) {
          setBanner(results[Math.floor(Math.random() * results.length)]);
        }
      } catch (error) {
        console.error("Unable to load banner:", error.message);
      }
    };

    fetchBanner();
  }, []);

  const truncate = (text, maxLength) =>
    text?.length > maxLength ? `${text.slice(0, maxLength - 1)}...` : text;

  return (
    <section
      className={styles.banner}
      style={
        banner?.backdrop_path
          ? {
              backgroundSize: "cover",
              backgroundImage: `url("${BANNER_BASE}${banner.backdrop_path}")`,
            }
          : undefined
      }
    >
      <div className={styles.contents}>
        <img className={styles.logoImg} src={NetflixBannerLogo} alt="Netflix" />
        <h1 className={styles.title}>{banner?.name || banner?.title || ""}</h1>
        <p className={styles.description}>{truncate(banner?.overview, 120)}</p>

        <div className={styles.buttonContainer}>
          <button type="button" className={styles.button}>
            <Play size={30} />
            Play
          </button>
          <button type="button" className={styles.button}>
            <Info size={30} />
            More Info
          </button>
        </div>

        <div className={styles.fadeBottom} />
      </div>
    </section>
  );
}

export default Banner;
