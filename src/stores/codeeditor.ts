import { create } from "zustand";

interface CodeEditorState {
  mainSchemaText: string;
  setMainSchemaText: (_:string) => void;
  addToMainSchemaText: (_:string) => void;
  buffering: boolean;
  setBuffering: (_:boolean) => void;
}

const useCodeEditorStore = create<CodeEditorState>()(set => ({
  mainSchemaText: "",
  setMainSchemaText: (newSchemaText: string) => set(state => ({ mainSchemaText: newSchemaText})),
  addToMainSchemaText: (newCharacter: string) => set(state => ({ mainSchemaText: state.mainSchemaText + newCharacter})),
  buffering: false,
  setBuffering: (val: boolean) => set(_ => ({ buffering: val })),
}));

export default useCodeEditorStore;