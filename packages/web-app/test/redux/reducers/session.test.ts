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
      userId: userId
    } as SessionState)
  })
})


