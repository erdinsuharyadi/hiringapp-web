import axios from 'axios'

export const getEngineer = (username) => {
  return {
    type: 'GET_USER',
    payload: axios.get('http://3.82.228.249:2000/engineer/user/' + username)
  }
}

export const getCompany = (username) => {
  return {
    type: 'GET_USER',
    payload: axios.get('http://3.82.228.249:2000/company/user/' + username)
  }
}