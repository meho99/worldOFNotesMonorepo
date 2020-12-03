import { UserModel } from '@won/core'

import { ThemeTypes, FiniteStates } from '../../../src/consts'
import { sessionReducer, SessionState, sessionActions } from '../../../src/redux/reducers/session'

describe('sesionReducer test', () => {
  it('authenticate action test', () => {
    expect(
      sessionReducer(
        { ...new SessionState() },
        sessionActions.authenticate()
      )
    ).toEqual({
      ...new SessionState(),
      authenticatingStatus: FiniteStates.Loading
    } as SessionState)
  })

  it('authenticationError action test', () => {
    expect(
      sessionReducer(
        { ...new SessionState() },
        sessionActions.authenticateError()
      )
    ).toEqual({
      ...new SessionState(),
      authenticatingStatus: FiniteStates.Failure
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
          ...new SessionState()
        },
        sessionActions.authenticateSuccess({ token: testToken, userData: testUserData })
      )
    ).toEqual({
      ...new SessionState(),
      user: testUserData,
      token: testToken,
      authenticatingStatus: FiniteStates.Success
    } as SessionState)
  })

  it('login action test', () => {
    expect(
      sessionReducer(
        {
          ...new SessionState()
        },
        sessionActions.login()
      )
    ).toEqual({
      ...new SessionState(),
      loginStatus: FiniteStates.Loading
    } as SessionState)
  })

  it('loginError action test', () => {
    expect(
      sessionReducer(
        {
          ...new SessionState()
        },
        sessionActions.loginError()
      )
    ).toEqual({
      ...new SessionState(),
      loginStatus: FiniteStates.Failure
    } as SessionState)
  })

  it('loginSuccess action test', () => {
    const testToken = 'testToken'
    expect(
      sessionReducer(
        {
          ...new SessionState()
        },
        sessionActions.loginSuccess({ token: testToken })
      )
    ).toEqual({
      ...new SessionState(),
      token: testToken,
      loginStatus: FiniteStates.Success
    } as SessionState)
  })

  it('changeThemeType action test', () => {
    expect(
      sessionReducer(
        {
          ...new SessionState(),
          theme: ThemeTypes.Light
        },
        sessionActions.changeThemeType()
      )
    ).toEqual({
      ...new SessionState(),
      theme: ThemeTypes.Dark
    } as SessionState)
  })
})
