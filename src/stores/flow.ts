import { create } from "zustand";

interface FlowState {
  codeEditorOpen: boolean;
  toggleEditorOpen: () => void;
  setEditorOpen: (_:boolean) => void;
}

const useFlowStore = create<FlowState>()(set => ({
  codeEditorOpen: false,
  toggleEditorOpen: () => set(state => ({
    codeEditorOpen: !state.codeEditorOpen,
  })),
  setEditorOpen: val => set(_ => ({ codeEditorOpen: val}))
}));

export default useFlowStore;