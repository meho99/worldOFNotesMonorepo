import faunadb from 'faunadb'
import { AddFolderRequest, SignUpRequest, UserModel } from '@won/core'
import { FaunaQuery, FoldersData } from '../../src/types'

export const addUser = async (dbClient: faunadb.Client, userData: SignUpRequest) => {
  const { Create, Collection } = faunadb.query

  const { password, email, name } = userData

  const user = {
    credentials: { password },
    data: { email, name },
  }

  const { ref, data } = await dbClient.query<FaunaQuery<UserModel>>(
    Create(Collection('Users'), user),
  )

  return { ref, data, id: ref.id }
}

export const addFolder = async (
  dbClient: faunadb.Client,
  folderData: AddFolderRequest & { userId: string },
) => {
  const { Ref, Create, Collection } = faunadb.query

  const { name, description, userId } = folderData

  const folder = {
    data: {
      name,
      description,
      user: Ref(Collection('Users'), userId),
    },
  }

  const { ref, data } = await dbClient.query<FoldersData>(
    Create(Collection('Folders'), folder),
  )

  return { ref, data, id: ref.id }
}
