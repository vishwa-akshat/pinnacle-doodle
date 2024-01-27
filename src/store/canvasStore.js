import { create } from "zustand";

const useCanvasStore = create((set) => ({
    activeShape: "Selector",
    shapes: [],
    setActiveShape: (val) => set({ activeShape: val }),
    setShapes: (val) => set({ shape: val }),
}));

export default useCanvasStore;
