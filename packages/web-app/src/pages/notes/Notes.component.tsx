import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Typography from '@mui/material/Typography'

import { AddFolderRequest } from '@won/core'
import { SubmitButton } from '../../components/submitButton/SubmitButton.component'
import { FiniteStates } from '../../consts'
import {
  addFolderStatusSelector,
  foldersDataSelector,
} from '../../redux/folders/folders.selectors'
import { addFolderThunk, fetchFoldersThunk } from '../../redux/folders/folders.thunks'

export const NotesComponent: React.FC = () => {
  const dispatch = useDispatch()
  const addFolderStatus = useSelector(addFolderStatusSelector)

  const folders = useSelector(foldersDataSelector)

  useEffect(() => {
    dispatch(fetchFoldersThunk())
  }, [dispatch])

  const handleAddFolder = useCallback(() => {
    const testFolder: AddFolderRequest = {
      description: 'testowy folderek 4',
      name: 'test7',
    }

    dispatch(addFolderThunk(testFolder))
  }, [dispatch])

  return (
    <div>
      <SubmitButton
        onClick={handleAddFolder}
        type='button'
        isLoading={addFolderStatus === FiniteStates.Loading}
      >
        dodaj folder
      </SubmitButton>
      {folders.map((folder) => (
        <Typography color='textPrimary'>{folder.name}</Typography>
      ))}
    </div>
  )
}
