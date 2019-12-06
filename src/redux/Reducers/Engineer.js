const initialState = {
  engList: [],
  isLoading: false,
  isFulfilled: false,
  isRejected: false
}

const engList = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_ENG_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false
      }
    case 'GET_ENG_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true
      }
    case 'GET_ENG_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        engList: action.payload.data.result
      }
    default:
      return state
  }
}

export default engList