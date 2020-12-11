import React from 'react'
import { shallow } from 'enzyme'

import TestComponent from './TestComponent'

describe('TestComponent', () => {
  test('内容', () => {
    const wrapper = shallow(<TestComponent />)
    expect(wrapper).toHaveText('i am TestComponent')
  })
})
