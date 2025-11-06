import { create } from 'zustand';

// Define the dragon information type
interface DragonInfo {
  name: string;
  color: string;
  origin: string;
  age: number;
}

// Define the footprint information type
export interface FootprintInfo {
  from: string;
  to: string;
}

// Define the leaks type
export interface Leaks {
  name: boolean;
  age: boolean;
  origin: boolean;
}

// Define the last leaked field type
export type LastLeakedField = "name" | "age" | "origin" | null;

// Define the store type
export interface DragonStore {
  dragonInfo: DragonInfo;
  currentStop: string;
  leaks: Leaks;
  lastLeakedField: LastLeakedField;
  footprintInfo: FootprintInfo;
  gameOver: boolean;
  currentMap: 'map1' | 'map2';
  setDragonInfo: (info: DragonInfo) => void;
  setCurrentStop: (stop: string) => void;
  setLeaks: (leaks: Leaks) => void;
  setLastLeakedField: (field: LastLeakedField) => void;
  setFootprintInfo: (info: FootprintInfo) => void;
  setGameOver: (gameOver: boolean) => void;
  setCurrentMap: (map: 'map1' | 'map2') => void;
  resetGame: () => void;
}

// Create the store with default values
export const useDragonStore = create<DragonStore>((set, get) => ({
  dragonInfo: {
    name: '',
    color: 'Red',
    origin: '',
    age: 5,
  },
  currentStop: '',
  leaks: {
    name: false,
    age: false,
    origin: false,
  },
  lastLeakedField: null,
  footprintInfo: {
    from: '',
    to: '',
  },
  gameOver: false,
  currentMap: 'map1',
  setDragonInfo: (info) => set({ dragonInfo: info }),
  setCurrentStop: (stop) => set({ currentStop: stop }),
  setLeaks: (leaks) => set({ leaks }),
  setLastLeakedField: (field) => set({ lastLeakedField: field }),
  setFootprintInfo: (info) => set({ footprintInfo: info }),
  setGameOver: (gameOver) => set({ gameOver }),
  setCurrentMap: (map) => set({ currentMap: map }),
  resetGame: () => {
    const prevMap = get().currentMap;
    const nextMap = prevMap === 'map1' ? 'map2' : 'map1';
    set({
      dragonInfo: {
        name: '',
        color: 'Red',
        origin: '',
        age: 5,
      },
      currentStop: '',
      leaks: {
        name: false,
        age: false,
        origin: false,
      },
      lastLeakedField: null,
      footprintInfo: {
        from: '',
        to: '',
      },
      gameOver: false,
      currentMap: nextMap,
    });
  },
})); 