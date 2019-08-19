import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Video from './components/Video';
import { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {configure as configureEnzyme } from 'enzyme';
import { expect } from 'chai'
import createChaiEnzyme from 'chai-enzyme'
import chai from 'chai'

configureEnzyme({ adapter: new Adapter() });

describe('<App />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App />)
  })

  it('should have a video', () =>{
  	const wrapper = mount(<App/>);
  	expect(wrapper.find('video')).to.have.length(1);
  })
})