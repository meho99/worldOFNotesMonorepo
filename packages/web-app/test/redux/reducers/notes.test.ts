import { notesReducer, NotesState, notesActions } from '../../../src/redux/notes/notes.reducer'

describe('notesReducer test', () => {
  it('setFolderName action test', () => {
    const name = 'name'

    expect(
      notesReducer(
        { ...new NotesState() },
        notesActions.setFolderName(name)
      )
    ).toEqual({
      ...new NotesState(),
      folderName: name
    } as NotesState)
  })
})
