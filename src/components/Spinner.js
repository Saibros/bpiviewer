import React from 'react';
import styles from './Spinner.css';

const Spinner = () => (
  <div className={styles.wrapper}>
    <div className={styles.svgContainer}>
      <svg className={styles.svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 66 66">
        <g>
          <circle className={styles.path} cx="33" cy="33" r="30" />
        </g>
      </svg>
    </div>
  </div>
);

export default Spinner;
