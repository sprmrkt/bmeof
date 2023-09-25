import {create} from "zustand";

export const useStore = create(set => ({
  setProjectIsOpen: value => set({projectIsOpen: value}),
  customCursorIsVisible: false,
  setEmbedIsOpen: value => set({embedIsOpen: value}),
  embedContent: null,
  setEmbedContent: value => set({embedContent: value}),
  horizontalHover: false,

  // nav
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
  workNavSplitIndex: null,
  setWorkNavSplitIndex: value => set({workNavSplitIndex: value}),
  workNavUpPosition: 0,
  setWorkNavUpPosition: value => set({workNavUpPosition: value}),
  workNavDownPosition: 0,
  setWorkNavDownPosition: value => set({workNavDownPosition: value}),
  closeWorkNav: value => set({
    workNavDownPosition: 0,
    workNavUpPosition: 0,
    workNavSplitIndex: null,
  }),
}));

