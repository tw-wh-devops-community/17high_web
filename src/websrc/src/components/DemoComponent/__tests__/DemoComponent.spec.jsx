import React from 'react';
import { shallow } from 'enzyme';
import DemoComponent from '../index';

jest.dontMock('../index');

describe('A suite', () => {
  it('contains spec with an expectation', () => {
    expect(shallow(<DemoComponent />).contains(<p className="transition">Hi</p>)).toBe(true);
  });
});
