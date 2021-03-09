import * as actionTypes from './ActionTypes'
import axios from 'axios'

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}
export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: idToken,
    userId: userId
  }
}
export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('expirationDate')
  localStorage.removeItem('localId')

  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const checkTimeOut = (expirationDate) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, expirationDate * 1000);
  }
}

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart())
    const authData = {
      email,
      password,
      returnSecureToken: true
    }
    // console.log(isSignup);
    const url = isSignup ?
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD1TgfbdzLyEODi17XT1ib74PJTbaawk94' :
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD1TgfbdzLyEODi17XT1ib74PJTbaawk94';

    axios.post(url, authData)
      .then(response => {
        const { idToken, localId, expiresIn } = response.data
        const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000))
        // set local storage
        localStorage.setItem('token', idToken)
        localStorage.setItem('expirationDate', expirationDate)
        localStorage.setItem('localId', localId)

        dispatch(authSuccess(idToken, localId))
        dispatch(checkTimeOut(expiresIn))

      })
      .catch(err => dispatch(authFail(err.response.data.error)))
  }
}

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token')
    if (!token) {
      dispatch(logout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      if (expirationDate <= new Date()) {
        dispatch(logout())
      } else {
        const localId = localStorage.getItem('localId')
        dispatch(authSuccess(token, localId))
        dispatch(checkTimeOut((expirationDate.getTime() - new Date().getTime()) / 1000))
      }
    }
  }
}
