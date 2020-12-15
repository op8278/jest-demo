// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

import Enzyme from 'enzyme'
// import Adapter from 'enzyme-adapter-react-16'

// 非官方的 Adapter,因为官方的16版本的 mount方 法在 React 17 中会报错,所以暂时使用非官方的17版本Adapter
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

import 'jest-enzyme'

Enzyme.configure({ adapter: new Adapter() })
