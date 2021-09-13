const mockUndoList = {
  data: [
    {
      status: 'div',
      value: 'learn jest',
    },
  ],
  success: true,
}

let isSuccess = true
const axios = {
  get(url) {
    if (url === '/undoList.json') {
      return new Promise((resolve, reject) => {
        if (isSuccess) {
          resolve(mockUndoList)
        } else {
          reject(new Error())
        }
      })
    }
  },
  setIsSuccess(flag = true) {
    isSuccess = flag
  },
}
export default axios
