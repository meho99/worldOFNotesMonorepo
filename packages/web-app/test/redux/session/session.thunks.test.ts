import { push } from 'connected-react-router'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import axios from 'axios'
import { AnyAction } from '@reduxjs/toolkit'

import { AuthResponse, LoginRequest, LoginResponse, SignUpRequest } from '@won/core'
import { SessionState } from '../../../src/redux/session/session.reducer'
import { Urls } from '../../../src/consts'
import {
  authenticateThunk,
  loginThunk,
  logOutThunk,
  signUpThunk,
} from '../../../src/redux/session/session.thunks'
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
  id: '5',
  name: 'imie',
  token: '34534534',
}

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('session thunks tests', () => {
  describe('authenticateThunk tests', () => {
    it('authenticateThunk', async () => {
      const authenticateUserResponse: AuthResponse = {
        email: 'email',
        name: 'imie',
        id: '5',
      }

      axios['mockImplementationOnce'](() =>
        Promise.resolve({ data: authenticateUserResponse }),
      )

      const expectedActions = [
        expect.objectContaining({ type: authenticateThunk.pending.type }),
        expect.objectContaining({
          type: authenticateThunk.fulfilled.type,
          payload: { token: testToken, userData: authenticateUserResponse },
        }),
      ]

      const store = mockStore({ ...new SessionState() })

      await store.dispatch(authenticateThunk() as unknown as AnyAction)
      expect(localStorage.getItem).toHaveBeenCalledWith('token')
      expect(store.getActions()).toEqual(expectedActions)
    })

    it('authenticateThunk error', async () => {
      axios['mockImplementationOnce'](() => Promise.reject({}))

      const expectedActions = [
        expect.objectContaining({ type: authenticateThunk.pending.type }),
        expect.objectContaining({ type: authenticateThunk.rejected.type }),
        notificationsActions.addErrorNotification('Unauthorized'),
        push(Urls.Login),
      ]
      const store = mockStore({ ...new SessionState() })

      await store.dispatch(authenticateThunk() as unknown as AnyAction)
      expect(localStorage.getItem).toHaveBeenCalledWith('token')
      expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions))
    })
  })

  describe('loginThunk tests', () => {
    const loginRequestData: LoginRequest = {
      email: 'email',
      password: 'haslo',
    }

    it('loginThunk', async () => {
      axios['mockImplementationOnce'](() =>
        Promise.resolve({ data: mockedSignUpUserResponse }),
      )

      const expectedActions = [
        expect.objectContaining({ type: loginThunk.pending.type }),
        push(Urls.Notes),
        expect.objectContaining({
          type: loginThunk.fulfilled.type,
          payload: mockedSignUpUserResponse,
        }),
      ]
      const store = mockStore({ ...new SessionState() })

      await store.dispatch(loginThunk(loginRequestData) as unknown as AnyAction)
      expect(store.getActions()).toEqual(expectedActions)
    })

    it('loginThunk error', async () => {
      axios['mockImplementationOnce'](() => Promise.reject({}))

      const expectedActions = [
        expect.objectContaining({ type: loginThunk.pending.type }),
        expect.objectContaining({ type: loginThunk.rejected.type }),
        notificationsActions.addErrorNotification(
          'Unable to login. Please check your email and password and try again.',
        ),
      ]
      const store = mockStore({ ...new SessionState() })

      await store.dispatch(loginThunk(loginRequestData) as unknown as AnyAction)
      expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions))
    })
  })

  describe('signUpThunk tests', () => {
    const signUpRequestData: SignUpRequest = {
      email: 'email',
      name: 'imie',
      password: 'haslo',
    }

    it('signUpThunk', async () => {
      axios['mockImplementationOnce'](() =>
        Promise.resolve({ data: mockedSignUpUserResponse }),
      )

      const expectedActions = [
        expect.objectContaining({ type: signUpThunk.pending.type }),
        push(Urls.Notes),
        expect.objectContaining({
          type: signUpThunk.fulfilled.type,
          payload: mockedSignUpUserResponse,
        }),
      ]
      const store = mockStore({ ...new SessionState() })

      await store.dispatch(signUpThunk(signUpRequestData) as unknown as AnyAction)
      expect(store.getActions()).toEqual(expectedActions)
    })

    it('signUpThunk error', async () => {
      axios['mockImplementationOnce'](() => Promise.reject({}))

      const expectedActions = [
        expect.objectContaining({ type: signUpThunk.pending.type }),
        notificationsActions.addErrorNotification(
          'Unable to sign up. Please check your email and password and try again.',
        ),
        expect.objectContaining({ type: signUpThunk.rejected.type }),
      ]
      const store = mockStore({ ...new SessionState() })

      await store.dispatch(signUpThunk(signUpRequestData) as unknown as AnyAction)
      expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions))
    })
  })

  it('logOutThunk', async () => {
    const expectedActions = [
      expect.objectContaining({ type: logOutThunk.pending.type }),
      push(Urls.Login),
      expect.objectContaining({ type: logOutThunk.fulfilled.type }),
    ]
    const store = mockStore({ todos: [] })

    await store.dispatch(logOutThunk() as unknown as AnyAction)
    expect(localStorage.removeItem).toHaveBeenCalledWith('token')
    expect(store.getActions()).toEqual(expectedActions)
  })
})
