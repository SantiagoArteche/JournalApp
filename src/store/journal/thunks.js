import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import {
  addNewEmptyNote,
  setActiveNote,
  savingNewNote,
  setNotes,
  setSaving,
  updateNote,
  setNotePhotos,
  deleteNoteById,
} from "./journalSlice";
import { fileUpload, loadNotes } from "../../helpers";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote());
    const { uid } = getState().auth;

    const newNote = {
      title: "",
      body: "",
      date: new Date().toString().slice(3, 21).trim(),
      imageUrls: [],
    };

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));

    await setDoc(newDoc, newNote);

    newNote.id = newDoc.id;

    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};
export const startSavingNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());
    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    const noteToFireStore = { ...note };
    delete noteToFireStore.id;

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);

    await setDoc(docRef, noteToFireStore, { merge: true });

    dispatch(updateNote(note));
  };
};

export const startUploadingFiles = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving());

    const fileUploadPromises = [];

    for (const file of files) fileUploadPromises.push(fileUpload(file));

    const photosUrl = await Promise.all(fileUploadPromises);

    dispatch(setNotePhotos(photosUrl));
  };
};

export const deleteNotesByID = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());
    const { active: note } = getState().journal;
    const { uid } = getState().auth;

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);

    await deleteDoc(docRef);

    dispatch(deleteNoteById(note.id));
  };
};
