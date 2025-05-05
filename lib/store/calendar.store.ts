import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { IHoliday } from "../interfaces/IHoliday";

interface State {
  year: string;
  holidays: IHoliday[];
  setHolidays: (holidays: IHoliday[]) => void;
  selectedHoliday: IHoliday | null;
  setSelectedHoliday: (holiday: IHoliday | null) => void;
}

const useCalendarStore = create<State>()(
  persist(
    (set) => ({
      year: "",
      holidays: [],
      setHolidays: (holidays: IHoliday[]) => {
        set({ holidays, year: new Date().getFullYear().toString() });
      },
      selectedHoliday: null,
      setSelectedHoliday: (selectedHoliday) => set({ selectedHoliday }),
    }),
    {
      name: "calendar-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCalendarStore;
