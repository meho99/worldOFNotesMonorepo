export type FolderModel = Record<'description' | 'name', string> & {
  id: string;
}

export type UserFoldersResponse = {
  folders: FolderModel[];
}

export type AddFolderRequest = Omit<FolderModel, 'id'>
export type AddFolderResponse = FolderModel

export type UpdateFolderRequest = FolderModel
export type UpdateFolderResponse = FolderModel
