describe('测试 mock function', () => {
  const testFn = (fn, ...args) => {
    let count = 0
    fn(...args)
    count++
    return count
  }

  describe('mock 的元属性', () => {
    /**
     * mock.calls就是一个数组,数组的长度就是调用的次数,数组每一项就是调用时传入的参数
     * 例如: calls: [[1,2]] 就是调用了一次,第一次调用时传入了2个参数,分别为1,2
     */
    test('mock.calls', () => {
      const mockFn = jest.fn()
      testFn(mockFn, 1, 2)
      // 调用了1次
      expect(mockFn.mock.calls.length).toBe(1)
      // 第一个参数为1
      expect(mockFn.mock.calls[0][0]).toBe(1)
      // 第二个参数为2
      expect(mockFn.mock.calls[0][1]).toBe(2)
    })

    /**
     * mock.results就是一个数组,数组的长度就是调用的次数,数组每一项就是函数调用的返回值
     * 例如: results: [{ type: 'return', value: 1 }] 就是调用了一次,第一次调用函数的返回值
     */
    test('mock.results', () => {
      const mockFn = jest.fn(() => {
        return 1
      })
      testFn(mockFn, 3, 4)
      // 调用了1次
      expect(mockFn.mock.results.length).toBe(1)
      // 第一次调用的返回值为1
      expect(mockFn.mock.results[0].value).toBe(1)
    })

    /**
     * mock.instances就是一个数组,数组的长度就是调用的次数,数组每一项就是函数调用时的 this 值(new 调用时,返回返回的额外对象暂时不考虑)
     * 例如: instances: [ mockConstructor { a: 1 } ] 就是调用了一次,第一次调用函数时的 this 值为 { a: 1 }
     */
    test('mock.instances', () => {
      const mockFn = jest.fn(function () {
        this.a = 1
        return { b: 1 } // 使用 new 操作符时,虽然返回了一个引用类型,但是不影响 this 的指向,即 mock.instances 不受影响
      })

      new mockFn()

      mockFn.call({
        c: 3,
      })

      // 调用了2次
      expect(mockFn.mock.instances.length).toBe(2)
      // 第一次调用时的 this 为 {a:1}
      expect(mockFn.mock.instances[0]).toMatchObject({
        a: 1,
      })
      // 第二次调用时的 this 为 {a:1,c:3}
      expect(mockFn.mock.instances[1]).toMatchObject({
        c: 3,
      })
    })

    /**
     * mock.invocationCallOrder就是一个数组,数组的长度就是调用的次数,数组每一项就是函数的序号,(序号在 jest 内部自增?)
     * 例如: invocationCallOrder: [ 5, 6 ] 就是调用了二次,第一次调用了序号为5的函数
     */
    test('mock.invocationCallOrder', (done) => {
      const mockFn = jest.fn()

      setTimeout(() => {
        testFn(mockFn, 1, 2)
      }, 100)
      let a = testFn(mockFn, 3, 4)

      setTimeout(() => {
        console.log(mockFn.mock)
        // 调用了2次
        expect(mockFn.mock.invocationCallOrder.length).toBe(2)

        done()
      }, 200)
    })
  })
})
