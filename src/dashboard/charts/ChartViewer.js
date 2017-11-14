import React, { Component } from 'react';
import PropTypes from 'prop-types';
import sizeMe from 'react-sizeme';
import Spinner from '../../components/Spinner';
import styles from './ChartViewer.css';

class ChartViewer extends Component {
  static propTypes = {
    title: PropTypes.string,
    isFetching: PropTypes.bool,
    // eslint-disable-next-line react/forbid-prop-types
    size: PropTypes.object,
    children: PropTypes.element,
  };

  static defaultProps = {
    title: '',
    isFetching: false,
  };

  render() {
    const { children, title, isFetching } = this.props;
    const { width, height } = this.props.size;
    return (
      <div className={styles.wrapper}>
        {title && <h2 className={styles.title}>{title}</h2>}
        <div className={styles.inner}>
          {!isFetching &&
            React.cloneElement(children, { width, height: height - 70 })
          }
          { isFetching && <Spinner /> }
        </div>
      </div>
    );
  }
}

const sizeMeConfig = {
  monitorWidth: true,
  monitorHeight: true,
};

export default sizeMe(sizeMeConfig)(ChartViewer);
