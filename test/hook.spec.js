describe('测试钩子函数顺序', () => {
  let orderList = null
  beforeAll(() => {
    orderList = ['1 - beforeAll']
  })
  afterAll(() => {
    orderList.push('1 - afterAll')
    console.log('orderList', orderList)
  })
  beforeEach(() => {
    orderList.push('1 - beforeEach')
  })
  afterEach(() => {
    orderList.push('1 - afterEach')
  })

  test('', () => {
    orderList.push('1 - test')
  })

  describe('sub describe', () => {
    beforeAll(() => {
      orderList.push('2 - beforeAll')
    })
    afterAll(() => {
      orderList.push('2 - afterAll')
    })
    beforeEach(() => {
      orderList.push('2 - beforeEach')
    })
    afterEach(() => {
      orderList.push('2 - afterEach')
    })

    test('', () => {
      orderList.push('2 - test')
    })
  })
})

// 1 - beforeAll
// 1 - beforeEach
// 1 - test
// 1 - afterEach
// 2 - beforeAll
// 1 - beforeEach
// 2 - beforeEach
// 2 - test
// 2 - afterEach
// 1 - afterEach
// 2 - afterAll
// 1 - afterAll

describe.skip('outer', () => {
  console.log('describe outer-a')

  describe('describe inner 1', () => {
    console.log('describe inner 1')
    test('test 1', () => {
      console.log('test for describe inner 1')
      expect(true).toEqual(true)
    })
  })

  console.log('describe outer-b')

  test('test 1', () => {
    console.log('test for describe outer')
    expect(true).toEqual(true)
  })

  describe('describe inner 2', () => {
    console.log('describe inner 2')
    test('test for describe inner 2', () => {
      console.log('test for describe inner 2')
      expect(false).toEqual(false)
    })
  })

  console.log('describe outer-c')
})

// describe outer-a
// describe inner 1
// describe outer-b
// describe inner 2
// describe outer-c
// test for describe inner 1
// test for describe outer
// test for describe inner 2
