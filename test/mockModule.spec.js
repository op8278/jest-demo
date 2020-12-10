import axios from 'axios'
import { fetchDataPromise } from '../src/api'
// 方式1: 直接调用jest.mock
jest.mock('axios')

// TODO: 方式2: 利用__mocks__文件夹

describe('测试 mock module', () => {
  describe('测试 axios 模块 -- 未 mock', () => {
    beforeEach(() => {
      jest.unmock('axios')
      jest.resetModules()
    })
    test('axios.get 成功', () => {
      const { fetchDataPromise } = require('../src/api')

      return fetchDataPromise('http://www.dell-lee.com/react/api/demo.json').then((resp) => {
        expect(resp.data).toEqual({ success: true })
      })
    })
    test('axios.get 失败', () => {
      const { fetchDataPromise } = require('../src/api')
      expect.assertions(1)
      return fetchDataPromise('http://www.dell-lee.com/react/api/demo1.json')
        .then((resp) => {
          console.log(resp.data)
          expect(resp.data).toEqual({ success: false })
        })
        .catch((error) => {
          // Error: Request failed with status code 404
          expect(error.toString().indexOf('404') > -1).toBe(true)
        })
    })
  })
  describe('测试 axios 模块 -- 已 mock', () => {
    test('axios.get 成功', () => {
      axios.get.mockResolvedValueOnce({ data: { success: true } })
      // fetchDataPromise 里面有调用 axios.get
      return fetchDataPromise('http://www.dell-lee.com/react/api/demo.json').then((resp) => {
        expect(resp.data).toEqual({ success: true })
      })
    })
    test('axios.get 失败', () => {
      axios.get.mockRejectedValue(new Error('Request failed with status code 404'))
      expect.assertions(1)
      // fetchDataPromise 里面有调用 axios.get
      return fetchDataPromise('http://www.dell-lee.com/react/api/demo1.json')
        .then((resp) => {
          expect(resp.data).toEqual({ success: false })
        })
        .catch((error) => {
          // Error: Request failed with status code 404
          expect(error.toString().indexOf('404') > -1).toBe(true)
        })
    })
  })
})
