import NewNoteForm from './components/NewNoteForm'
import NoteList from './components/NoteList'
import '../styles/globals.css'
import { getNotes } from './acctions/noteAcctions';

export default async function Home() {
  const notes: Note[] = await getNotes()

  return (
    <div>
      <header>
        <h1>Appwrite Notes</h1>
      </header>

      <NoteList initialNotes={notes} />
      <NewNoteForm />
    </div>
  );
}
