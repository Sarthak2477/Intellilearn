import { create } from "zustand";

interface FlowState {
  codeEditorOpen: boolean;
  toggleEditorOpen: () => void;
}

const useFlowStore = create<FlowState>()(set => ({
  codeEditorOpen: true,
  toggleEditorOpen: () => set(state => ({
    codeEditorOpen: !state.codeEditorOpen,
  })),
}));

export default useFlowStore;