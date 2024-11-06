"use client";
import { useEffect, useState } from "react";
import { deleteNote } from "../acctions/noteAcctions";
import { client } from "@/utils/appwrite";

export default function NoteList({ initialNotes }: { initialNotes: Note[] }) {
	const [notes, setNotes] = useState<Note[]>(initialNotes);

	const handleDelete = async (noteId: string) => {
		let element = document.getElementById(noteId);

		if (element) {
			element.classList.add("crossed-out");
		}

		await deleteNote(noteId);
	};

	useEffect(() => {
		const channel =
			"databases.67282f4c0003b3df68fe.collections.notes.documents";

		const unsubscribe = client.subscribe(channel, (response) => {
			const eventType = response.events[0];
			console.log("response.events", response.events[0]);

			const changedNote = response.payload as Note;

			if (eventType.includes("create")) {
				setNotes((prevNotes) => [changedNote, ...prevNotes]);
			}

			if (eventType.includes("delete")) {
				setNotes((prevNotes) =>
					prevNotes.filter((note) => note.$id !== changedNote.$id)
				);
			}
		});

		return () => unsubscribe();
	}, []);

	return (
		<ul>
			{notes.map((note) => (
				<li key={note.$id} id={note.$id} onClick={() => handleDelete(note.$id)}>
					<p>{note.content}</p>
				</li>
			))}
		</ul>
	);
}
