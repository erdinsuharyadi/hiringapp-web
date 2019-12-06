import axios from 'axios'

export const getEng = (test) => {
  console.log('action ' + test)
  return {
    type: 'GET_MENU',
    payload: axios.get('http://localhost:4000/engineer/')
  }
}