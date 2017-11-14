import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.css';

const Navbar = () => (
  <nav className={styles.nav}>
    <ul className={styles.mainMenu}>
      <li className={styles.logoItem}>
        <Link to="/" className={styles.logo}>
          BPI <span className={styles.lite}>Viewer</span>
        </Link>
      </li>
    </ul>
  </nav>
);

export default Navbar;
