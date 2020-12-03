import { UserModel } from '@won/core'
import { sessionReducer, SessionState, sessionActions } from '../../../src/redux/reducers/session'

describe('sesionReducer test', () => {
  it('setIsAuthenticated action test', () => {
    const isAuthenticated = true

    expect(
      sessionReducer(
        { ...new SessionState() },
        sessionActions.setIsAuthenticated(isAuthenticated)
      )
    ).toEqual({
      ...new SessionState(),
      isAuthenticated
    } as SessionState)
  })

  it('authenticate action test', () => {
    expect(
      sessionReducer(
        { ...new SessionState() },
        sessionActions.authenticate()
      )
    ).toEqual({
      ...new SessionState(),
      isLoading: true
    } as SessionState)
  })

  it('authenticationError action test', () => {
    expect(
      sessionReducer(
        { ...new SessionState() },
        sessionActions.authenticationError()
      )
    ).toEqual({
      ...new SessionState(),
      isLoading: false
    } as SessionState)
  })

  it('authenticationSuccess action test', () => {
    const testUserData: UserModel = {
      email: 'test@test.test',
      name: 'Damian',
      id:123
    }

    const testToken = 'tokenData'

    expect(
      sessionReducer(
        {
          ...new SessionState(),
          isLoading: true
        },
        sessionActions.authenticationSuccess({ token: testToken, userData: testUserData })
      )
    ).toEqual({
      ...new SessionState(),
      user: testUserData,
      token: testToken,
      isAuthenticated: true,
      isLoading: false
    } as SessionState)
  })
})
