import { create } from "zustand";

const useCanvasStore = create((set) => ({
    activeShape: false,
    setActiveShape: (val) => set({ activeShape: val }),
}));

export default useCanvasStore;
