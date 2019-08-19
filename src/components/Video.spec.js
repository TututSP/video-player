import React from 'react';
import ReactDOM from 'react-dom';
import Video from './Video';
import { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {configure as configureEnzyme } from 'enzyme';
import { expect } from 'chai'
import createChaiEnzyme from 'chai-enzyme'
import chai from 'chai'

configureEnzyme({ adapter: new Adapter() });

describe('<Video />', () => {
  it('renders without crashing', () => {
    const wrapper = mount(<Video />)
  })

  it('should have an action button (play/pause)', () =>{
  	const wrapper = mount(<Video/>);
  	expect(wrapper.find('button.btn-action')).to.have.length(1);
  })
})
