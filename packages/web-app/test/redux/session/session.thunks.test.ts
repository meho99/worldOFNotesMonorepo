import { push } from 'connected-react-router'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import axios from 'axios'

import { AuthResponse, LoginRequest, LoginResponse, SignUpRequest } from '@won/core'
import { sessionActions, SessionState } from '../../../src/redux/session/session.reducer'
import { Urls } from '../../../src/consts'
import { authenticateThunk, loginThunk, logOutThunk, signUpThunk } from '../../../src/redux/session/session.thunks'
import { notificationsActions } from '../../../src/redux/notifications/notifications.reducer'

jest.mock('axios')
const testToken = 'dupa dupa pies pies'

const mockedRemoveItem = jest.fn()
const mockedGetItem = jest.fn().mockReturnValue(testToken)

jest.spyOn(window.localStorage.__proto__, 'removeItem')
jest.spyOn(window.localStorage.__proto__, 'getItem')
window.localStorage.__proto__.removeItem = mockedRemoveItem
window.localStorage.__proto__.getItem = mockedGetItem

const mockedSignUpUserResponse: LoginResponse = {
  email: 'mail',
  id: 5,
  name: 'imie',
  token: '34534534'
}

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('session thunks tests', () => {

  describe('authenticateThunk tests', () => {
    it('authenticateThunk', async () => {
      const authenticateUserResponse: AuthResponse = {
        email: 'email',
        name: 'imie',
        id: 5
      }

      axios['mockImplementationOnce'](() => Promise.resolve({ data: authenticateUserResponse }))

      const expectedActions = [
        sessionActions.authenticate(),
        sessionActions.authenticateSuccess({
          token: testToken,
          userData: authenticateUserResponse
        })
      ]
      const store = mockStore({ ...new SessionState() })

      await store.dispatch(authenticateThunk())
      expect(localStorage.getItem).toHaveBeenCalledWith('token')
      expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions))
    })

    it('authenticateThunk error', async () => {
      axios['mockImplementationOnce'](() => Promise.reject({}))

      const expectedActions = [
        sessionActions.authenticate(),
        sessionActions.authenticateError(),
        notificationsActions.addErrorNotification('Unauthorized'),
        push(Urls.Login)
      ]
      const store = mockStore({ ...new SessionState() })

      await store.dispatch(authenticateThunk())
      expect(localStorage.getItem).toHaveBeenCalledWith('token')
      expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions))
    })
  })

  describe('loginThunk tests', () => {
    const loginRequestData: LoginRequest = {
      email: 'email',
      password: 'haslo'
    }

    it('loginThunk', async () => {
      axios['mockImplementationOnce'](() => Promise.resolve({ data: mockedSignUpUserResponse }))

      const expectedActions = [
        sessionActions.login(),
        sessionActions.loginSuccess({ token: mockedSignUpUserResponse.token }),
        push(Urls.Notes)
      ]
      const store = mockStore({ ...new SessionState() })

      await store.dispatch(loginThunk(loginRequestData))
      expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions))
    })

    it('loginThunk error', async () => {
      axios['mockImplementationOnce'](() => Promise.reject({}))

      const expectedActions = [
        sessionActions.login(),
        sessionActions.loginError(),
        notificationsActions.addErrorNotification('Unable to login. Please check your email and password and try again.')
      ]
      const store = mockStore({ ...new SessionState() })

      await store.dispatch(loginThunk(loginRequestData))
      expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions))
    })
  })

  describe('signUpThunk tests', () => {
    const signUpRequestData: SignUpRequest = {
      email: 'email',
      name: 'imie',
      password: 'haslo'
    }

    it('signUpThunk', async () => {
      axios['mockImplementationOnce'](() => Promise.resolve({ data: mockedSignUpUserResponse }))

      const expectedActions = [
        sessionActions.signUp(),
        sessionActions.signUpSuccess({ token: mockedSignUpUserResponse.token }),
        push(Urls.Notes)
      ]
      const store = mockStore({ ...new SessionState() })

      await store.dispatch(signUpThunk(signUpRequestData))
      expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions))
    })

    it('signUpThunk error', async () => {
      axios['mockImplementationOnce'](() => Promise.reject({}))

      const expectedActions = [
        sessionActions.signUp(),
        sessionActions.signUpError(),
        notificationsActions.addErrorNotification('Unable to sign up. Please check your email and password and try again.')
      ]
      const store = mockStore({ ...new SessionState() })

      await store.dispatch(signUpThunk(signUpRequestData))
      expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions))
    })
  })

  it('logOutThunk', () => {
    const expectedActions = [
      sessionActions.logOut(),
      push(Urls.Login)
    ]
    const store = mockStore({ todos: [] })

    store.dispatch(logOutThunk())
    expect(localStorage.removeItem).toHaveBeenCalledWith('token')
    expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions))
  })
})
