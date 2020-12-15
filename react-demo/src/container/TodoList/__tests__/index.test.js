import React from 'react'
import { shallow, mount } from 'enzyme'

import TodoList from '../index'
import { findTestWrapper } from '../../../utils'

describe('TodoList 单元测试', () => {
  describe('初始化', () => {
    test('快照, undoList 数组 为空', () => {
      const wrapper = mount(<TodoList />)

      wrapper.setState({
        undoList: [],
      })

      expect(wrapper).toMatchSnapshot()
    })

    test('快照, undoList 数组有值,且不含 input', () => {
      const wrapper = mount(<TodoList />)

      wrapper.setState({
        undoList: [
          { status: 'div', value: 'value1' },
          { status: 'div', value: 'value2' },
        ],
      })

      expect(wrapper).toMatchSnapshot()
    })

    test('快照, undoList 数组有值,且含 input', () => {
      const wrapper = mount(<TodoList />)

      wrapper.setState({
        undoList: [
          { status: 'div', value: 'value1' },
          { status: 'input', value: 'value2' },
        ],
      })

      expect(wrapper).toMatchSnapshot()
    })

    test('只包含一个 Header 组件', () => {
      const wrapper = shallow(<TodoList />)
      const Header = wrapper.find('Header')
      expect(Header).toHaveLength(1)
    })
    test('只包含一个 UndoList 组件', () => {
      const wrapper = shallow(<TodoList />)
      const UndoList = wrapper.find('UndoList')
      expect(UndoList).toHaveLength(1)
    })

    test('默认 undoList 为数组为空', () => {
      const wrapper = shallow(<TodoList />)
      expect(wrapper.state('undoList')).toEqual([])
    })
    test('应该给 Header 组件传递 addUndoItem 方法', () => {
      const wrapper = shallow(<TodoList />)
      const Header = wrapper.find('Header')

      // 这种方式耦合性太强,不推荐
      // expect(Header.prop("addUndoItem")).toBe(wrapper.instance().addUndoItem);

      // 解耦
      expect(Header.prop('addUndoItem')).toBeTruthy()
    })

    test('应该给 UndoList 组件传递 list 数据和 deleteItem,changeStatus,handleBlur,valueChange 方法', () => {
      const wrapper = shallow(<TodoList />)
      const UndoList = wrapper.find('UndoList')

      expect(UndoList.prop('deleteItem')).toBeTruthy()
      expect(UndoList.prop('changeStatus')).toBeTruthy()
      expect(UndoList.prop('handleBlur')).toBeTruthy()
      expect(UndoList.prop('valueChange')).toBeTruthy()
      expect(UndoList.prop('list')).toBeTruthy()
    })
  })

  describe('行为', () => {
    test('触发 addUndoItem 函数时,新增 undoList 内容', () => {
      const wrapper = shallow(<TodoList />)

      const value = '新增内容'

      /* 单位测试写法,没有跟其他单位(组件)耦合 */
      const { addUndoItem } = wrapper.instance()

      /* 集成测试写法,耦合度高 */
      // const Header = wrapper.find("Header");
      // const addUndoItem = Header.prop("addUndoItem");

      addUndoItem(value)

      expect(wrapper.state('undoList').length).toBe(1)
      expect(wrapper.state('undoList')[0]).toEqual({
        status: 'div',
        value,
      })
    })

    test('触发 deleteItem 函数时,删除 undoList 内容', () => {
      const wrapper = shallow(<TodoList />)

      wrapper.setState({
        undoList: [
          { status: 'div', value: 'ddd' },
          { status: 'div', value: 'aaa' },
        ],
      })

      expect(wrapper.state('undoList').length).toBe(2)

      const { deleteItem } = wrapper.instance()

      // 删除索引1
      deleteItem(1)

      expect(wrapper.state('undoList').length).toBe(1)
      expect(wrapper.state('undoList')).toEqual([{ status: 'div', value: 'ddd' }])
    })

    test('触发 changeStatus 函数时,undoList 对应内容数据项的 status 应该被修改', () => {
      const wrapper = shallow(<TodoList />)

      wrapper.setState({
        undoList: [
          { status: 'div', value: 'ddd' },
          { status: 'div', value: 'aaa' },
        ],
      })

      const { changeStatus } = wrapper.instance()

      // 改变索引1
      changeStatus(1)

      expect(wrapper.state('undoList')).toEqual([
        { status: 'div', value: 'ddd' },
        { status: 'input', value: 'aaa' },
      ])
    })

    test('触发 handleBlur 函数时,undoList 对应内容数据项的 status 应该从 input 恢复成 div', () => {
      const wrapper = shallow(<TodoList />)

      wrapper.setState({
        undoList: [
          { status: 'div', value: 'ddd' },
          { status: 'input', value: 'aaa' },
        ],
      })

      const { handleBlur } = wrapper.instance()

      // 改变索引1
      handleBlur(1)

      expect(wrapper.state('undoList')).toEqual([
        { status: 'div', value: 'ddd' },
        { status: 'div', value: 'aaa' },
      ])
    })

    test('触发 valueChange 函数时,undoList 对应内容数据项的 value 应该被修改', () => {
      const wrapper = shallow(<TodoList />)

      wrapper.setState({
        undoList: [
          { status: 'div', value: 'ddd' },
          { status: 'div', value: 'aaa' },
        ],
      })

      const { valueChange } = wrapper.instance()

      // 改变索引1
      valueChange(1, '我是修改内容')

      expect(wrapper.state('undoList')).toEqual([
        { status: 'div', value: 'ddd' },
        { status: 'div', value: '我是修改内容' },
      ])
    })
  })
})
