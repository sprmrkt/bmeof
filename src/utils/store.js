import {create} from "zustand";

export const useStore = create(set => ({

  setProjectIsOpen: value => set({projectIsOpen: value}),
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
  closeNav: value => set({
    navDownPosition: 0,
    navUpPosition: 0,
    navSplitIndex: null,
  }),
  globalNavSplitHappenedOnce: false,
  setGlobalNavSplitHappenedOnce: value => set({globalNavSplitHappenedOnce: value}),


  // home hover

  hoverRight: false,
  setHoverRight: value => set({hoverRight: value}),

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
  workNavSplitHappenedOnce: false,
  setWorkNavSplitHappenedOnce: value => set({workNavSplitHappenedOnce: value}),

  //custom gallery hover 

  customCursorIsVisible: false,
  setCustomCursorIsVisible: value => set({ customCursorIsVisible: value }),
  customCursorContent: false,
  setCustomCursorContent: value => set({ customCursorContent: value }),
  embedIsOpen: false,
}));

