const initialState = {
  userData: {}
  // isLoading: false,
  // isFulfilled: false,
  // isRejected: false
}

const userData = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_USER_PENDING':
      return {
        ...state,
        // isLoading: true,
        // isRejected: false,
        // isFulfilled: false
      }
    case 'GET_USER_REJECTED':
      return {
        ...state,
        // isLoading: false,
        // isRejected: true
      }
    case 'GET_USER_FULFILLED':
      return {
        ...state,
        // isLoading: false,
        // isFulfilled: true,
        userData: action.payload.data.result[0]
      }
    default:
      return state
  }
}

export default userData