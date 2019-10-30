const { debounce, throttle } = require('../src/debounce.js')

let currentTime = Date.now()
let dateNowSpy

function fastforward(time) {
  currentTime += time
  // dateNowSpy.mockRestore();
  dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => currentTime)
  jest.advanceTimersByTime(time)
}

describe('去抖/节流', () => {
  describe('去抖', () => {
    test('测试是否返回一个函数', () => {
      const fn = debounce(() => {}, 100)
      expect(typeof fn).toBe('function')
    })
    test('测试是否没到waitTime时,不执行函数', () => {
      jest.useFakeTimers()
      const cb = jest.fn()
      const fn = debounce(cb, 100)
      fn()
      expect(cb).not.toHaveBeenCalled()
      jest.runAllTimers()
      expect(cb).toHaveBeenCalled()
      jest.useRealTimers()
    })
    test('测试是否执行1次,当在少于waitTime的间隙中,连续点击时', () => {
      jest.useFakeTimers()
      const cb = jest.fn()
      const fn = debounce(cb, 100)
      fn()
      fn()
      fn()
      fn()
      fn()
      jest.runAllTimers()
      expect(cb).toHaveBeenCalledTimes(1)
      jest.useRealTimers()
    })
    test('测试是否执行2次,当在2*waitTime的间隙中,连续点击时', () => {
      jest.useFakeTimers()
      const cb = jest.fn()
      const fn = debounce(cb, 100)
      fn()
      fn()
      jest.advanceTimersByTime(50) // 50ms
      expect(cb).not.toHaveBeenCalled()
      jest.advanceTimersByTime(50) // 100ms
      expect(cb).toHaveBeenCalledTimes(1)
      fn()
      fn()
      jest.advanceTimersByTime(50) // 150ms
      expect(cb).toHaveBeenCalledTimes(1)
      jest.advanceTimersByTime(50) // 200ms
      expect(cb).toHaveBeenCalledTimes(2)
      jest.useRealTimers()
    })
    test('测试是否立即执行', () => {
      jest.useFakeTimers()
      const cb = jest.fn()
      const fn = debounce(cb, 100, true)
      fn()
      fn()
      fn()
      fn()
      expect(cb).toHaveBeenCalled()
      expect(cb).toHaveBeenCalledTimes(1)
      jest.runAllTimers()
      expect(cb).toHaveBeenCalledTimes(1)
      jest.useRealTimers()
    })
    test('测试返回值', () => {
      const cb = jest.fn(() => 1)
      const fn = debounce(cb, 100, true)
      const result = fn()
      expect(result).toBe(1)
    })
    test('测试cancel', () => {
      jest.useFakeTimers()
      const cb = jest.fn()
      const fn = debounce(cb, 100)
      fn()
      fn()
      expect(cb).not.toHaveBeenCalled()
      jest.advanceTimersByTime(100) // 10ms
      expect(cb).toHaveBeenCalled()
      expect(cb).toHaveBeenCalledTimes(1)
      fn()
      fn()
      jest.advanceTimersByTime(50) // 150ms
      fn.cancel()
      jest.advanceTimersByTime(50) // 200ms

      expect(cb).toHaveBeenCalledTimes(1)
      jest.useRealTimers()
    })
  })

  describe('节流', () => {
    beforeAll(() => {
      jest.useFakeTimers()
      // Lock Time
      dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => currentTime)
    })

    afterAll(() => {
      jest.useRealTimers()
      // Unlock Time
      dateNowSpy.mockRestore()
    })

    test('测试是否返回一个函数', () => {
      const fn = throttle(() => {}, 100)
      expect(typeof fn).toBe('function')
    })
    test('测试是否立即执行', () => {
      const cb = jest.fn()
      const fn = throttle(cb, 100)
      fn()
      fn()
      fn()
      fn()
      expect(cb).toHaveBeenCalled()
      expect(cb).toHaveBeenCalledTimes(1)
    })
    test('测试连续执行', () => {
      const cb = jest.fn()
      const fn = throttle(cb, 100)
      fn()
      fn()
      fn()
      fn()
      expect(cb).toHaveBeenCalledTimes(1)
      fastforward(100)
      fn()
      fn()
      fn()
      fn()
      expect(cb).toHaveBeenCalledTimes(2)
      fastforward(50)
      expect(cb).toHaveBeenCalledTimes(2)
      fastforward(50)
      expect(cb).toHaveBeenCalledTimes(3)
    })

    test('测试cancel', () => {
      const cb = jest.fn()
      const fn = throttle(cb, 100)
      fn()
      fn()
      fn()
      fn()
      expect(cb).toHaveBeenCalledTimes(1)
      fastforward(100)
      expect(cb).toHaveBeenCalledTimes(2)
      fn()
      fn.cancel()
      expect(cb).toHaveBeenCalledTimes(2)
      fastforward(100)
      expect(cb).toHaveBeenCalledTimes(2)
    })
  })
})
