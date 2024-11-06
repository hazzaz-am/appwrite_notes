import { databases } from "@/utils/appwrite";
import { ID } from "appwrite";

export async function addNote(content: string): Promise<Note> {
	const newNote = { content: content };

	const response = await databases.createDocument(
		"67282f4c0003b3df68fe",
		"notes",
		ID.unique(),
		newNote
	);

	const note = {
		$id: response.$id,
		$createdAt: response.$createdAt,
		content: response.content,
	};

	return note;
}

export async function getNotes(): Promise<Note[]> {
	const response = await databases.listDocuments(
		"67282f4c0003b3df68fe",
		"notes"
	);
	console.log(response.documents);

	const notes: Note[] = response.documents.map((doc) => ({
		$id: doc.$id,
		$createdAt: doc.$createdAt,
		content: doc.content,
	}));

	return notes;
}

export async function deleteNote(noteId: string) {
	await databases.deleteDocument("67282f4c0003b3df68fe", "notes", noteId);
}
