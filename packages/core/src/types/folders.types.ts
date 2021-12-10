export type FolderModel = Record<'description' | 'name', string> & {
  id: number;
}

export type UserFoldersResponse = {
  folders: FolderModel[];
}

export type AddFolderRequest = Omit<FolderModel, 'id'>
