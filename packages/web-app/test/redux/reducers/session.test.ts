import { sessionReducer, SessionState, sessionActions } from '../../../src/redux/reducers/session'

describe('sesionReducer test', () => {
  it('setUserId action test', () => {
    const userId = 12

    expect(
      sessionReducer(
        { ...new SessionState() },
        sessionActions.setUserId(userId)
      )
    ).toEqual({
      ...new SessionState(),
      userId
    } as SessionState)
  })
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
})
