import create from 'zustand'

export const useStore = create(set => ({
  projectIsOpen: false,
  setProjectIsOpen: (value) => set({ projectIsOpen: value }),
  customCursorIsVisible: false,
  setCustomCursorIsVisible: (value) => set({ customCursorIsVisible: value }),
  customCursorContent: false,
  setCustomCursorContent: (value) => set({ customCursorContent: value }),
  embedIsOpen: false,
  setEmbedIsOpen: (value) => set({ embedIsOpen: value }),
  embedContent: null,
  setEmbedContent: (value) => set({ embedContent: value })
}))