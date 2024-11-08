import { create } from "zustand";

interface FlowState {
  codeEditorOpen: boolean;
  toggleEditorOpen: () => void;
}

const useFlowStore = create<FlowState>()(set => ({
  codeEditorOpen: false,
  toggleEditorOpen: () => set(state => ({
    codeEditorOpen: !state.codeEditorOpen,
  })),
}));

export default useFlowStore;