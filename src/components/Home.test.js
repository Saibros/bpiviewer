import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Home from './Home';
import styles from './Home.css';

describe('Home', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Home />);
    expect(toJson(wrapper)).toMatchSnapshot();
    // expect(wrapper.find('p').text()).toBe('Check the Bitcoin Price Index.');
    expect(wrapper.find(`.${styles.intro}`).text()).toBe('Check the Bitcoin Price Index.');
  });
});
