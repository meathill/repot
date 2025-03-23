import { create } from 'zustand';
import { SelectedCode } from '@/types';

type UiStore = {
  selectedCodes: SelectedCode[];
  addSelectedCode: (code: string, startLine: number, endLine: number, file: string) => void;
  clearSelectedCodes: () => void;
  removeSelectedCode: (index: number) => void;
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

  return {
    selectedCodes: [],

    addSelectedCode,
    clearSelectedCodes,
    removeSelectedCode,
  };
});

export default useUiStore;
