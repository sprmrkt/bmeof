import {create} from "zustand";

export const useStore = create(set => ({
  setProjectIsOpen: value => set({projectIsOpen: value}),
  customCursorIsVisible: false,
  setEmbedIsOpen: value => set({embedIsOpen: value}),
  embedContent: null,
  setEmbedContent: value => set({embedContent: value}),
  horizontalHover: false,
  // nav
  navActive: false,
  setNavActive: value => set({navActive: value}),
  closeNav: () => set({navActive: false}),

  navSplitIndex: null,
  setNavSplitIndex: value => set({navSplitIndex: value}),
  navUpPosition: 0,
  setNavUpPosition: value => set({navUpPosition: value}),
  navDownPosition: 0,
  setNavDownPosition: value => set({navDownPosition: value}),
  closeNavNew: value => set({
    navDownPosition: 0,
    navUpPosition: 0,
    navSplitIndex: null,
  }),

  // work
  workActive: false,
  setWorkActive: value => set({workActive: value}),
  closeWork: () => set({workActive: false}),
}));

