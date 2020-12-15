import React from 'react'
import { shallow } from 'enzyme'

import Header from '../index'
import { findTestWrapper } from '../../../../../utils'

describe('Header 单元测试', () => {
  describe('初始化', () => {
    test('快照', () => {
      const wrapper = shallow(<Header />)
      expect(wrapper).toMatchSnapshot()
    })

    test('只包含一个 input 框', () => {
      const wrapper = shallow(<Header />)
      const input = findTestWrapper(wrapper, 'input')
      expect(input).toHaveLength(1)
    })

    test('input 框的值默认为空', () => {
      const wrapper = shallow(<Header />)
      const inputElem = findTestWrapper(wrapper, 'input')
      expect(inputElem).toHaveProp('value', '')
    })
  })

  describe('行为', () => {
    test('input 框是一个受控组件', () => {
      const wrapper = shallow(<Header />)
      wrapper.setState({
        value: '123',
      })

      let inputElem = findTestWrapper(wrapper, 'input')
      expect(inputElem).toHaveProp('value', '123')

      wrapper.setState({
        value: '我是input框的值',
      })

      inputElem = findTestWrapper(wrapper, 'input')
      expect(inputElem).toHaveProp('value', '我是input框的值')
    })

    test('input 框的值随用户输入操作改变', () => {
      const wrapper = shallow(<Header />)
      let inputElem = findTestWrapper(wrapper, 'input')
      expect(inputElem).toHaveProp('value', '')

      // 手动触发 onChange 事件,模拟用户输入操作
      inputElem.simulate('change', {
        target: { value: '我是输入的值' },
      })

      inputElem = findTestWrapper(wrapper, 'input')
      expect(wrapper.state()).toMatchObject({
        value: '我是输入的值',
      })
      expect(inputElem).toHaveProp('value', '我是输入的值')
    })

    test('input 框输入回车时,如果没有输入值,则无操作', () => {
      const fn = jest.fn()
      const wrapper = shallow(<Header addUndoItem={fn} />)

      wrapper.setState({ value: '' })
      let inputElem = findTestWrapper(wrapper, 'input')

      inputElem.simulate('keyUp', {
        keyCode: 13,
      })

      expect(fn).toHaveBeenCalledTimes(0)

      inputElem = findTestWrapper(wrapper, 'input')
      expect(wrapper.state()).toMatchObject({
        value: '',
      })
      expect(inputElem).toHaveProp('value', '')
    })

    test('input 框输入回车时,如果有输入值,则 addUndoItem 函数被调用,并且 input 框被清空', () => {
      const fn = jest.fn()

      const wrapper = shallow(<Header addUndoItem={fn} />)
      wrapper.setState({ value: '我是输入内容' })
      let inputElem = findTestWrapper(wrapper, 'input')
      inputElem.simulate('keyUp', {
        keyCode: 13,
      })

      expect(fn).toHaveBeenCalledTimes(1)
      expect(fn).toHaveBeenCalledWith('我是输入内容')

      inputElem = findTestWrapper(wrapper, 'input')
      expect(wrapper.state()).toMatchObject({
        value: '',
      })
      expect(inputElem).toHaveProp('value', '')
    })
  })
})
