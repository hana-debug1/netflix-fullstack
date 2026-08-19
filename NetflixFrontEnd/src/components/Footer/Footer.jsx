import styles from "./Footer.module.css";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

function Footer() {
  const footerLinks = [
    [
      "FAQ",
      "Investor Relations",
      "Buy Gift Cards",
      "Cookie Preferences",
      "Legal Notices",
    ],
    [
      "Help Center",
      "Jobs",
      "Ways to Watch",
      "Corporate Information",
      "Only on Netflix",
    ],
    ["Account", "Netflix Shop", "Terms of Use", "Contact Us", "Ad Choices"],
    ["Media Center", "Redeem Gift Cards", "Privacy", "Speed Test"],
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.socialIcons}>
          <a href="#" aria-label="Facebook">
            <FaFacebookF />
          </a>

          <a href="#" aria-label="Instagram">
            <FaInstagram />
          </a>

          <a href="#" aria-label="Twitter">
            <FaTwitter />
          </a>

          <a href="#" aria-label="YouTube">
            <FaYoutube />
          </a>
        </div>

        <p className={styles.questions}>
          Questions? Call <a href="tel:18668393195">1-866-839-3195</a>
        </p>

        <div className={styles.linksGrid}>
          {footerLinks.map((column, columnIndex) => (
            <div className={styles.linkColumn} key={columnIndex}>
              {column.map((link) => (
                <a href="#" key={link}>
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>

        <div className={styles.languageWrapper}>
          <select
            className={styles.languageSelect}
            defaultValue="English"
            aria-label="Select language"
          >
            <option value="English">🌐 English</option>
            <option value="French">🌐 Français</option>
          </select>
        </div>

        <p className={styles.country}>Netflix Canada</p>
      </div>
    </footer>
  );
}

export default Footer;
