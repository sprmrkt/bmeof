import {create} from "zustand";

export const useStore = create(set => ({
  setProjectIsOpen: value => set({projectIsOpen: value}),
  customCursorIsVisible: false,
  setEmbedIsOpen: value => set({embedIsOpen: value}),
  embedContent: null,
  setEmbedContent: value => set({embedContent: value}),
  horizontalHover: false,
  navActive: false,
  setNavActive: value => set({navActive: value}),
  closeNav: () => set({navActive: false}),
}));

