import * as actionTypes from '../Actions/ActionTypes'
import { updateObject } from '../../Shared/Utility'

const initialState = {
  idToken: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: '/'
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START: return updateObject(state, { error: null, loading: true })

    case actionTypes.AUTH_SUCCESS:
      return updateObject(state, {
        idToken: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
      })

    case actionTypes.AUTH_FAIL:
      return updateObject(state, { error: action.error, loading: false })
    case actionTypes.AUTH_LOGOUT:
      return updateObject(state, { idToken: null, userId: null })
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return updateObject(state, { authRedirectPath: action.path })

    default: return state;
  }

}
export default reducer;
