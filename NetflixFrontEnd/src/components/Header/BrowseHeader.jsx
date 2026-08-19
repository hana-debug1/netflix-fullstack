import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bell, ChevronDown, Search, User } from "lucide-react";
import logo from "../../assets/images/logo.png";
import styles from "./BrowseHeader.module.css";

function BrowseHeader({ onLogout }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <Link to="/browse" aria-label="Netflix home">
          <img className={styles.logo} src={logo} alt="Netflix" />
        </Link>

        <nav className={styles.nav} aria-label="Primary navigation">
          <Link className={styles.navLink} to="/browse">Home</Link>
          <Link className={styles.navLink} to="/browse">TV Shows</Link>
          <Link className={styles.navLink} to="/browse">Movies</Link>
          <Link className={styles.navLink} to="/browse">New & Popular</Link>
          <Link className={styles.navLink} to="/browse">My List</Link>
          <Link className={styles.navLink} to="/browse">Browse by Language</Link>
        </nav>

        <div className={styles.rightSection}>
          <div className={styles.searchContainer}>
            <button
              type="button"
              onClick={() => setIsSearchOpen((open) => !open)}
              className={styles.searchButton}
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            {isSearchOpen && (
              <input
                type="search"
                placeholder="Titles, people, genres"
                className={styles.searchInput}
                aria-label="Search movies and shows"
              />
            )}
          </div>

          <button type="button" className={styles.iconButton} aria-label="Notifications">
            <Bell size={20} />
            <span className={styles.notificationBadge} aria-hidden="true" />
          </button>

          <div className={styles.profileContainer}>
            <button
              type="button"
              onClick={() => setIsProfileOpen((open) => !open)}
              className={styles.profileButton}
              aria-label="Open profile menu"
            >
              <div className={styles.profileAvatar}>
                <User size={20} />
              </div>
              <ChevronDown size={20} />
            </button>

            {isProfileOpen && (
              <div className={styles.profileMenu}>
                <Link className={styles.profileMenuItem} to="/browse">Account</Link>
                <Link className={styles.profileMenuItem} to="/browse">Help Center</Link>
                <hr className={styles.profileMenuDivider} />
                <button
                  type="button"
                  className={styles.profileMenuItem}
                  onClick={onLogout}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default BrowseHeader;
