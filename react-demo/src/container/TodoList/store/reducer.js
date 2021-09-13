import { CHANGE_INPUT_VALUE } from './constant'

const initialState = {
  inputValue: '',
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_INPUT_VALUE:
      return { inputValue: action.value }
    default:
      return state
  }
}

export default reducer
