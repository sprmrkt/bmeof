import create from 'zustand'

export const useStore = create(set => ({
  projectIsOpen: false,
  setProjectIsOpen: (value) => set({ projectIsOpen: value })
}))