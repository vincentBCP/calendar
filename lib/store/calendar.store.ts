import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface State {
  year: string;
  holidays: any[];
  setHolidays: (holidays: any[]) => void;
}

const useCalendarStore = create<State>()(
  persist(
    (set) => ({
      year: "",
      holidays: [],
      setHolidays: (holidays: any[]) => {
        set({ holidays, year: new Date().getFullYear().toString() });
      },
    }),
    {
      name: "calendar-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCalendarStore;
