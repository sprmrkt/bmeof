import create from 'zustand'

export const useStore = create(set => ({
  projectIsOpen: false,
  setProjectIsOpen: (value) => set({ projectIsOpen: value }),
  embedIsOpen: false,
  setEmbedIsOpen: (value) => set({ embedIsOpen: value }),
  customCursorIsVisible: false,
  setCustomCursorIsVisible: (value) => set({ customCursorIsVisible: value }),
  customCursorContent: false,
  setCustomCursorContent: (value) => set({ customCursorContent: value }),
  showEmbed: false,
  setShowEmbed: (value) => set({ showEmbed: value }),
  embedContent: null,
  setEmbedContent: (value) => set({ showEmbed: value })
}))