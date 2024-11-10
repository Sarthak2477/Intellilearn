import { create } from "zustand";

interface CodeEditorState {
  mainSchemaText: string;
  setMainSchemaText: (_:string) => void;
  addToMainSchemaText: (_:string) => void;
  diffSchemaText: string;
  addToDiffSchemaText: (_:string) => void;
  clearDiffSchemaText: () => void;
  mainCodeDiffMode: boolean; // For proposing changes
  setMainCodeDiffMode: (_:boolean) => void;
  
  buffering: boolean;
  setBuffering: (_:boolean) => void;
}

const useCodeEditorStore = create<CodeEditorState>()(set => ({
  mainSchemaText: "",
  setMainSchemaText: (newSchemaText) => set(state => ({ mainSchemaText: newSchemaText})),
  addToMainSchemaText: (newCharacter) => set(state => ({ mainSchemaText: state.mainSchemaText + newCharacter})),
  
  buffering: false,
  setBuffering: (val) => set(_ => ({ buffering: val })),
  
  diffSchemaText: "",
  addToDiffSchemaText: (newCharacter) => set(state => ({ diffSchemaText: state.diffSchemaText + newCharacter})),
  clearDiffSchemaText: () => set(_ => ({ diffSchemaText: ""})),

  mainCodeDiffMode: false,
  setMainCodeDiffMode: (val) => set(_ => ({ mainCodeDiffMode: val})),
}));

export default useCodeEditorStore;