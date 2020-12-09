describe('测试异步代码', () => {
  const delay = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms))
  const delayReject = (ms = 1000) =>
    new Promise((resolve, reject) =>
      setTimeout(() => {
        reject('delayReject error')
      }, ms)
    )

  /**
   * 回调方式
   * 如果不调用形参 done 函数的话,默认 5000ms 后,测试用例就会不通过
   * 调用 done 且不传参数,测试用例就会通过
   * 调用 done 且传参数,测试用例就会不通过
   */
  test('callback', (done) => {
    setTimeout(() => {
      expect(1).toBe(1)
      done()
      // done('这是错误信息') // error
    }, 200)
  })
  test('callback with error', (done) => {
    expect.assertions(0)
    setTimeout(() => {
      try {
        throw 1
        expect(1).toBe(1)
      } catch (error) {
        done()
      }
    }, 200)
  })

  /**
   * Promise 方式
   * 返回的 Promise 决议(resolve)了的话,测试用例通过,反之拒绝,不通过
   */
  test('return Promise', () => {
    return new Promise((resolve, reject) => {
      expect(1).toBe(1)
      resolve()
    })
  })
  test('return Promise with error', () => {
    expect.assertions(1)
    return new Promise((resolve, reject) => {
      reject('error')
    }).catch((e) => {
      expect(e).toMatch('error')
    })
  })

  /**
   * async
   * async 是语法糖,实际这个函数最终返回一个 Promise,最终状态可以根据函数返回值,近似看做为 Promise.resolve(returnValue)
   * 内部 throw 一个错误,或者 return Promise.reject(),测试用例就会不通过
   */
  test('async/await', async () => {
    // throw new Error('未知错误') // error
    // return Promise.reject(1) // error

    await delay(200)
    expect(1).toBe(1)
    return 1 // 等价于 return Promise.resolve(1)
  })
  test('async/await with error', async () => {
    expect.assertions(1)
    try {
      await delayReject(200)
    } catch (error) {
      expect(error).toMatch('error')
    }
  })

  /**
   * expect(Promise).resolves/.rejects 分别返回 Promise resolve/reject 后传递的值
   * 因为异步,需要主动 return 这个 expect,个人猜测 jest 已经内部封装成 Promise
   */
  test('.resolves/.rejects', () => {
    return expect(delay(200)).resolves.toBeUndefined()
  })
  test('.resolves/.rejects with error', () => {
    return expect(delayReject(200)).rejects.toMatch('error')
  })

  test('.resolves/.rejects + async/await', async () => {
    await expect(delay(200)).resolves.toBeUndefined()
  })

  test('.resolves/.rejects with error + async/await', async () => {
    await expect(delayReject(200)).rejects.toMatch('error')
  })
})
