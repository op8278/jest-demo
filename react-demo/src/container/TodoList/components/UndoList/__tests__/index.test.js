import React from 'react'
import { shallow } from 'enzyme'

import UndoList from '../index'
import { findTestWrapper } from '../../../../../utils'

describe('UndoList 单元测试', () => {
  describe('初始化', () => {
    test('快照,无 list 数组', () => {
      const wrapper = shallow(<UndoList />)
      expect(wrapper).toMatchSnapshot()
    })
    test('快照,有 list 数组', () => {
      const listData = [
        { status: 'div', value: 'ddd' },
        { status: 'div', value: 'aaa' },
      ]
      const wrapper = shallow(<UndoList list={listData} />)
      expect(wrapper).toMatchSnapshot()
    })
    test('快照,有 list 数组并含有 input 框', () => {
      const listData = [
        { status: 'div', value: 'ddd' },
        { status: 'input', value: 'aaa' },
      ]
      const wrapper = shallow(<UndoList list={listData} />)
      expect(wrapper).toMatchSnapshot()
    })

    test('数量显示默认为0,列表长度为0', () => {
      const wrapper = shallow(<UndoList />)
      const countElem = findTestWrapper(wrapper, 'count')
      const listItem = findTestWrapper(wrapper, 'list-item')

      expect(countElem.text()).toEqual('0')
      expect(listItem.length).toEqual(0)
    })

    test('list 数组有值时,数量显示为 list 长度,列表长度为 list 长度', () => {
      const listData = [
        { status: 'div', value: 'ddd' },
        { status: 'div', value: 'aaa' },
      ]
      const wrapper = shallow(<UndoList list={listData} />)
      const countElem = findTestWrapper(wrapper, 'count')
      const listItem = findTestWrapper(wrapper, 'list-item')
      expect(countElem.text()).toEqual('2')
      expect(listItem.length).toEqual(2)
    })
    test('list 数组有值时,删除按钮数量为 list 长度', () => {
      const listData = [
        { status: 'div', value: 'ddd' },
        { status: 'div', value: 'aaa' },
      ]
      const wrapper = shallow(<UndoList list={listData} />)
      const deleteItem = findTestWrapper(wrapper, 'delete-item')
      expect(deleteItem.length).toEqual(2)
    })
  })

  describe('行为', () => {
    test('点击删除按钮,触发 deleteItem 函数', () => {
      const listData = [
        { status: 'div', value: 'ddd' },
        { status: 'div', value: 'aaa' },
      ]
      const fn = jest.fn()
      const wrapper = shallow(<UndoList list={listData} deleteItem={fn} />)
      const deleteItem = findTestWrapper(wrapper, 'delete-item')

      deleteItem.at(1).simulate('click', {
        stopPropagation: () => {},
      })

      expect(fn).toHaveBeenCalledTimes(1)
      expect(fn).toHaveBeenCalledWith(1)
    })
    test('点击某一项时,触发 changeStatus 函数', () => {
      const listData = [
        { status: 'div', value: 'ddd' },
        { status: 'div', value: 'aaa' },
      ]
      const fn = jest.fn()
      const wrapper = shallow(<UndoList list={listData} changeStatus={fn} />)
      const listItem = findTestWrapper(wrapper, 'list-item')

      listItem.at(1).simulate('click')

      expect(fn).toHaveBeenCalledTimes(1)
      expect(fn).toHaveBeenCalledWith(1)
    })

    test('当某一项状态是input时候,展示输入框', () => {
      const listData = [
        { status: 'input', value: 'ddd' },
        { status: 'div', value: 'aaa' },
      ]
      const wrapper = shallow(<UndoList list={listData} />)
      const inputElem = findTestWrapper(wrapper, 'input')
      expect(inputElem).toHaveLength(1)
    })
    test('当某一个输入框失去焦点，触发 handleBlur 方法', () => {
      const listData = [
        { status: 'input', value: 'ddd' },
        { status: 'div', value: 'aaa' },
      ]
      const index = 0
      const fn = jest.fn()
      const wrapper = shallow(<UndoList handleBlur={fn} list={listData} />)
      const inputElem = findTestWrapper(wrapper, 'input')
      inputElem.simulate('blur')
      expect(fn).toHaveBeenLastCalledWith(index)
    })
    test('当某一个输入框改变时，触发 valueChange 方法', () => {
      const listData = [
        { status: 'input', value: 'ddd' },
        { status: 'div', value: 'aaa' },
      ]
      const index = 0
      const value = 'ccc'
      const fn = jest.fn()
      const wrapper = shallow(<UndoList valueChange={fn} list={listData} />)
      const inputElem = findTestWrapper(wrapper, 'input')
      inputElem.simulate('change', {
        target: {
          value,
        },
      })
      expect(fn).toHaveBeenLastCalledWith(index, value)
    })
  })
})
