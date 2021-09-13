import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'

import TodoList from '../index'
import { findTestWrapper } from '../../../utils'
import store from '../../../store/createStore'

describe('TodoList 集成测试', () => {
  // eslint-disable-next-line jest/valid-title
  test(`
  1.用户会在 Header 组件输入框输入内容
  2.用户会点击回车按钮
  3.列表应该增加用户输入内容的列表项
`, () => {
    const wrapper = mount(
      <Provider store={store}>
        <TodoList />
      </Provider>
    )
    const inputElem = findTestWrapper(wrapper, 'input')
    const value = 'shu qin'

    inputElem.simulate('change', {
      target: { value: value },
    })
    inputElem.simulate('keyUp', {
      keyCode: 13,
    })

    const listItems = findTestWrapper(wrapper, 'list-item')
    expect(listItems.length).toBe(1)
    expect(listItems.at(0).text()).toMatch('shu qin')
  })

  // eslint-disable-next-line jest/valid-title
  test(`
  1.用户会在 Header 组件输入框没有输入内容(或者输入空字符串)
  2.用户会点击回车按钮
  3.列表不应该增加用户输入内容的列表项
`, () => {
    const wrapper = mount(
      <Provider store={store}>
        <TodoList />
      </Provider>
    )
    const inputElem = findTestWrapper(wrapper, 'input')
    const value = ''

    inputElem.simulate('change', {
      target: { value: value },
    })
    inputElem.simulate('keyUp', {
      keyCode: 13,
    })

    const listItems = findTestWrapper(wrapper, 'list-item')
    expect(listItems.length).toBe(0)
  })
})
