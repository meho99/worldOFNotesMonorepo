import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authenticatingStatusSelector } from '../redux/session/session.selectors'
import { authenticateThunk } from '../redux/session/session.thunks'

export const useAuthenticate = () => {
  const dispatch = useDispatch()
  const status = useSelector(authenticatingStatusSelector)

  useEffect(() => {
    dispatch(authenticateThunk())
  }, [dispatch])

  return status
}
