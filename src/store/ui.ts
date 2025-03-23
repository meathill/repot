import { create } from 'zustand';
import { CodeFile, SelectedCode } from '@/types';

type UiStore = {
  currentFile: CodeFile | null;
  selectedCodes: SelectedCode[];
  addSelectedCode: (code: string, startLine: number, endLine: number, file: string) => void;
  clearSelectedCodes: () => void;
  removeSelectedCode: (index: number) => void;
  setCurrentFile: (file: string, code?: string) => void;
}

const useUiStore = create<UiStore>((set, get) => {
  function addSelectedCode(code: string, startLine: number, endLine: number, file: string) {
    const { selectedCodes } = get();
    set({
      selectedCodes: [
        ...selectedCodes,
        {
          code,
          startLine,
          endLine,
          file,
        },
      ],
    });
  }
  function clearSelectedCodes() {
    set({ selectedCodes: [] });
  }
  function removeSelectedCode(index: number) {
    const { selectedCodes } = get();
    const newSelectedCodes = [...selectedCodes];
    newSelectedCodes.splice(index, 1);
    set({ selectedCodes: newSelectedCodes });
  }
  function setCurrentFile(file: string, code: string = '') {
    if (file) {
      set({ currentFile: { file, code } });
    } else {
      set({ currentFile: null });
    }
  }

  return {
    currentFile: null,
    selectedCodes: [],

    addSelectedCode,
    clearSelectedCodes,
    removeSelectedCode,
    setCurrentFile,
  };
});

export default useUiStore;
