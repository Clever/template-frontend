import * as React from 'react';
import { shallow } from 'enzyme';

import Home from './';

describe('Home', () => {
  it('renders a header', () => {
    const rendered = shallow(<Home />);
    expect(rendered.find('h1').length).toBe(1);
  });
});