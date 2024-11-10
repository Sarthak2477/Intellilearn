import { create } from "zustand";

interface InspectorState {
  mainSchemaText: string;
  setMainSchemaText: (_:string) => void;
  addToMainSchemaText: (_:string) => void;
  clearMainSchemaText: () => void;

  diffSchemaText: string;
  setDiffSchemaText: (_:string) => void;
  addToDiffSchemaText: (_:string) => void;
  clearDiffSchemaText: () => void;

  mainCodeDiffMode: boolean; // For proposing changes
  setMainCodeDiffMode: (_:boolean) => void;
  
  buffering: boolean;
  setBuffering: (_:boolean) => void;

  documentationText: string;
  setDocumentationText: (_: string) => void;
  addToDocumentationText: (_:string) => void;
}

const useInspectorStore = create<InspectorState>()(set => ({
  mainSchemaText: "",
  setMainSchemaText: (newSchemaText) => set(state => ({ mainSchemaText: newSchemaText})),
  addToMainSchemaText: (newCharacter) => set(state => ({ mainSchemaText: state.mainSchemaText + newCharacter})),
  clearMainSchemaText: () => set(_ => ({ mainSchemaText: "" })),
  
  buffering: false,
  setBuffering: (val) => set(_ => ({ buffering: val })),
  
  diffSchemaText: "",
  addToDiffSchemaText: (newCharacter) => set(state => ({ diffSchemaText: state.diffSchemaText + newCharacter})),
  setDiffSchemaText: (newSchemaText) => set(_ => ({ diffSchemaText: newSchemaText})),
  clearDiffSchemaText: () => set(_ => ({ diffSchemaText: ""})),

  mainCodeDiffMode: false,
  setMainCodeDiffMode: (val) => set(_ => ({ mainCodeDiffMode: val})),

  documentationText: "",
  setDocumentationText: (newDocumentationText) => set(_ => ({ documentationText: newDocumentationText })),
  addToDocumentationText: (newCharacter) => set(state => ({ documentationText: state.documentationText + newCharacter})),
}));

export default useInspectorStore;