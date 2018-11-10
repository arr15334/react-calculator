import React from 'react'
import {shallow} from '../enzyme'
import { mount } from 'enzyme'
import sinon from 'sinon'
import App from '../App.jsx'

describe('My first collection of test', () => {
  it('renders the equal button', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find('#equal_btn').text()).toEqual('=')
  })

  it('clicks the 2 button', () => {
    const wrapper = mount(
      <App />
    );
    wrapper.find('div.numbers button').at(1).simulate('click')
    // expect(onButtonClick).to.have.property('callCount', 1);
    expect(wrapper.find('div.display').text()).toEqual('2')
  })

  it('clicks same button twice', () => {
    const wrapper = mount(
      <App />
    );
    wrapper.find('div.numbers button').at(1).simulate('click')
    wrapper.find('div.numbers button').at(1).simulate('click')
    // expect(onButtonClick).to.have.property('callCount', 1);
    expect(wrapper.find('div.display').text()).toEqual('22')
  })

  it('makes simple addition', () => {
    const wrapper = mount(
      <App />
    );
    wrapper.find('div.numbers button').at(4).simulate('click') //5
    wrapper.find('div.operations button').at(0).simulate('click') //+
    wrapper.find('div.numbers button').at(3).simulate('click') //4
    wrapper.find('#equal_btn').simulate('click') // =
    expect(wrapper.find('div.display').text()).toEqual('9')
  })

  it('verifies ERROR msg when result has more than 9 digits', () => {
    const wrapper = mount(
      <App />
    );
    wrapper.find('div.numbers button').at(0).simulate('click')    // 1
    wrapper.find('div.numbers button').at(10).simulate('click')    // 0
    wrapper.find('div.numbers button').at(10).simulate('click')    // 0
    wrapper.find('div.numbers button').at(10).simulate('click')    // 0
    wrapper.find('div.numbers button').at(10).simulate('click')    // 0
    wrapper.find('div.numbers button').at(10).simulate('click')    // 0
    wrapper.find('div.numbers button').at(10).simulate('click')    // 0
    wrapper.find('div.operations button').at(2).simulate('click')   // *
    wrapper.find('div.numbers button').at(0).simulate('click')    // 1
    wrapper.find('div.numbers button').at(10).simulate('click')    // 0
    wrapper.find('div.numbers button').at(10).simulate('click')    // 0
    wrapper.find('div.numbers button').at(10).simulate('click')    // 0
    wrapper.find('div.numbers button').at(10).simulate('click')    // 0
    wrapper.find('div.numbers button').at(10).simulate('click')    // 0
    wrapper.find('div.numbers button').at(10).simulate('click')    // 0

    wrapper.find('#equal_btn').simulate('click') // =
    expect(wrapper.find('div.display').text()).toEqual('ERROR')
  })

  it('checks if error when substraction result < 0', () => {
    const wrapper = mount(
      <App />
    );
    wrapper.find('div.numbers button').at(0).simulate('click')      // 1
    wrapper.find('div.operations button').at(1).simulate('click')   // -
    wrapper.find('div.numbers button').at(1).simulate('click')      // 2
    wrapper.find('#equal_btn').simulate('click')                    // =

    expect(wrapper.find('div.display').text()).toEqual('ERROR')
  })
})
