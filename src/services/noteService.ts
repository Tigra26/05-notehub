import axios from "axios";
import type { Note } from "../types/note";

// axios instanse

const noteApi = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },
});

// GET request

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  search: string,
  page: number, 
  perPage: number
): Promise<FetchNotesResponse> => {
  const params = {
    search,
    page,
    perPage
  };

  const { data } = await noteApi.get<FetchNotesResponse>("/notes", {
    params,
  });

  return data;
};

// POST request

interface NewNoteData {
  title: string;
  content?: string;
  tag: string;
}

export const createNote = async (newNoteData: NewNoteData): Promise<Note> => {
  const { data } = await noteApi.post<Note>("/notes", newNoteData);
  return data;
};

// DELETE request

export const deleteNote = async (id: Note["id"]): Promise<Note> => {
  const { data } = await noteApi.delete<Note>(`/notes/${id}`);
  return data;
};
