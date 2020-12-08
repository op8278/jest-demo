describe('测试各种matcher', () => {
  /**
   * toBe 近似与 Object.is() 方法,NaN 会相等,会区分正负0
   * 对于引用类型,需要2者引用相等
   */
  test('toBe', () => {
    expect(1).toBe(1)
    expect(true).toBe(true)
    expect(false).toBe(false)
    expect('').toBe('')
    expect('abc').toBe('abc')
    expect(null).toBe(null)
    expect(undefined).toBe(undefined)
    expect(NaN).toBe(NaN)
    expect(+0).toBe(+0)
    expect(-0).toBe(-0)
    // expect(+0).toBe(-0) // error
    // expect({ a: 1 }).toBe({ a: 1 }) // error,引用不相等
    // expect([]).toBe([]) // error,引用不相等
  })

  /**
   * toEqual
   * 对于基础类型,跟 toBe 一样
   * 对于引用类型,会递归比较他们的拥有字段,要字段完全相等
   */
  test('toEqual', () => {
    expect(1).toEqual(1)
    expect(true).toEqual(true)
    expect(false).toEqual(false)
    expect('').toEqual('')
    expect('abc').toEqual('abc')
    expect(null).toEqual(null)
    expect(undefined).toEqual(undefined)
    expect(NaN).toEqual(NaN)
    expect(+0).toEqual(+0)
    expect(-0).toEqual(-0)
    // expect(+0).toEqual(-0) // error
    expect({ a: 1, b: { c: 1 } }).toEqual({ a: 1, b: { c: 1 } })
    expect([]).toEqual([])
  })

  test('真假值', () => {
    // toBeFalsy 为假值,就是转换为 boolean 为 false 的值
    expect(+0).toBeFalsy()
    expect(0).toBeFalsy()
    expect(-0).toBeFalsy()
    expect('').toBeFalsy()
    expect(null).toBeFalsy()
    expect(undefined).toBeFalsy()
    expect(NaN).toBeFalsy()

    // .not 是取反的意思
    expect(+0).not.toBeTruthy()
    expect(0).not.toBeTruthy()
    expect(-0).not.toBeTruthy()
    expect('').not.toBeTruthy()
    expect(null).not.toBeTruthy()
    expect(undefined).not.toBeTruthy()
    expect(NaN).not.toBeTruthy()
  })

  test('Number', () => {
    expect(typeof 0).toBe('number')
    // 大于,小于,等于
    expect(0).toBeLessThan(1)
    expect(0).toBeLessThanOrEqual(0)
    expect(2).toBeGreaterThan(1)
    expect(2).toBeGreaterThanOrEqual(2)

    expect(NaN).toBeNaN()
    // expect('21').toBeNaN() // error

    // 浮点数相加
    expect(0.1 + 0.2).toBeCloseTo(0.3)
    // expect(0.1 + 0.2).toBe(0.3) // error,浮点数有舍入误差
  })

  test('String', () => {
    expect(typeof '123').toBe('string')

    // 正则表达式
    expect('123').toMatch('2')
    expect('123').toMatch(/[0-9]+/)
  })

  test('Array', () => {
    expect(Object.prototype.toString.call(['1', '2'])).toBe('[object Array]')

    expect([1, 2, 3]).toContain(1)
    // expect([1, 2, 3]).toContain(4) // error

    // 判断数组的引用类型,需要调用 toContainEqual

    // expect([{ a: 1, b: 2, c: 3 }, { d: 4 }]).toContain({ a: 1, b: 2, c: 3 }) // error
    expect([{ a: 1, b: 2, c: 3 }, { d: 4 }]).toContainEqual({ a: 1, b: 2, c: 3 })
    // expect([{ a: 1, b: 2, c: 3 }, { d: 4 }]).toContainEqual({ a: 1 }) // error
  })

  test('Error', () => {
    function crashFn() {
      throw new Error('未知错误')
    }
    function throw1() {
      throw 1
    }
    expect(() => crashFn()).toThrow(Error)
    expect(() => crashFn()).toThrowError()
    expect(() => throw1()).toThrow('1')

    expect(crashFn).toThrow(Error)
    expect(crashFn).toThrowError()
    expect(throw1).toThrow('1')

    // expect(() => {
    //   return 1
    // }).toThrow() // error
  })
})
