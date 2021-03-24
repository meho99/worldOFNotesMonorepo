import { UserModel } from '@won/core'

import { ThemeTypes, FiniteStates } from '../../../src/consts'
import { sessionReducer, SessionState, sessionActions } from '../../../src/redux/session/session.reducer'
import { authenticateThunk, loginThunk, logOutThunk, signUpThunk } from '../../../src/redux/session/session.thunks'

describe('sessionReducer test', () => {
  it('authenticate action test', () => {
    expect(
      sessionReducer(
        { ...new SessionState() },
        authenticateThunk.pending
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
        authenticateThunk.rejected
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
      id: 123
    }

    const testToken = 'tokenData'

    expect(
      sessionReducer(
        {
          ...new SessionState()
        },
        {
          type: authenticateThunk.fulfilled.type,
          payload: { token: testToken, userData: testUserData }
        }
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
        loginThunk.pending
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
        loginThunk.rejected
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
        {
          type: loginThunk.fulfilled.type,
          payload: { token: testToken }
        }
      )
    ).toEqual({
      ...new SessionState(),
      token: testToken,
      loginStatus: FiniteStates.Success
    } as SessionState)
  })

  it('signUp action test', () => {
    expect(
      sessionReducer(
        {
          ...new SessionState()
        },
        signUpThunk.pending
      )
    ).toEqual({
      ...new SessionState(),
      signUpStatus: FiniteStates.Loading
    } as SessionState)
  })

  it('signUpError action test', () => {
    expect(
      sessionReducer(
        {
          ...new SessionState()
        },
        signUpThunk.rejected
      )
    ).toEqual({
      ...new SessionState(),
      signUpStatus: FiniteStates.Failure
    } as SessionState)
  })

  it('signUpSuccess action test', () => {
    const testToken = 'testToken'
    expect(
      sessionReducer(
        {
          ...new SessionState()
        },
        {
          type: signUpThunk.fulfilled.type,
          payload: { token: testToken }
        }
      )
    ).toEqual({
      ...new SessionState(),
      token: testToken,
      signUpStatus: FiniteStates.Success
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

  it('logOut action test', () => {
    expect(
      sessionReducer(
        {
          ...new SessionState(),
          authenticatingStatus: FiniteStates.Success,
          loginStatus: FiniteStates.Success,
          signUpStatus: FiniteStates.Success,
          token: 'tu jest token lol',
          user: { email: '', id: 5, name: 'name' }
        },
        logOutThunk.fulfilled
      )
    ).toEqual({
      ...new SessionState(),
      token: null
    } as SessionState)
  })
})
