import React from 'react';
import { shallow } from 'enzyme';
import Spinner from '../components/Spinner';
import CurrentPricePanel from './CurrentPricePanel';
import styles from './CurrentPricePanel.css';

describe('CurrentPricePanel', () => {
  const props = {
    currency: 'USD',
    description: '',
    price: 15,
    priceYesterday: 10,
    priceUSD: 2.5,
    isFetching: false,
  };

  it('should render spinner during fetch', () => {
    const wrapper = shallow(<CurrentPricePanel {...props} isFetching />);
    // Spinner is displayed if isFetching === true
    expect(wrapper.contains(<Spinner />)).toBe(true);
  });

  it('should not render USD rate', () => {
    const wrapper = shallow(<CurrentPricePanel {...props} />);
    // div with USD price shouldn't be rendered
    expect(wrapper.find(`.${styles.usd}`).length).toBe(0);
  });

  it('should render 50% percentage increase', () => {
    const wrapper = shallow(<CurrentPricePanel {...props} />);
    expect(wrapper.find(`.${styles.up}`).text()).toBe('50%');
  });
});
