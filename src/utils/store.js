import create from 'zustand'

export const useStore = create(set => ({
  accordionIsOpen: false,
  setAccordionIsOpen: (value) => set({ accordionIsOpen: value }),
  projectIsOpen: false,
  setProjectIsOpen: (value) => set({ projectIsOpen: value }),
  customCursorIsVisible: false,
  setCustomCursorIsVisible: (value) => set({ customCursorIsVisible: value }),
  customCursorContent: false,
  setCustomCursorContent: (value) => set({ customCursorContent: value }),
  embedIsOpen: false,
  setEmbedIsOpen: (value) => set({ embedIsOpen: value }),
  embedContent: null,
  setEmbedContent: (value) => set({ embedContent: value }),
  horizontalHover: false,
  setHorizontalHover: (value) => set({ horizontalHover: value }),
  horizontalHoverDistance: 0,
  setHorizontalHoverDistance: (value) => set(state => ({ horizontalHoverDistance: Math.max(value, state.horizontalHoverDistance) }))
}))