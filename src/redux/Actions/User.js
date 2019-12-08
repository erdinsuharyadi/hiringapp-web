import axios from 'axios'

export const getEngineer = (username) => {
  return {
    type: 'GET_USER',
    payload: axios.get('http://35.174.156.122:2000/engineer/user/' + username)
  }
}

export const getCompany = (username) => {
  return {
    type: 'GET_USER',
    payload: axios.get('http://35.174.156.122:2000/company/user/' + username)
  }
}