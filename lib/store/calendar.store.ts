import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { IHoliday } from "../interfaces/IHoliday";
import { ICalendarEvent } from "../interfaces/ICalendarEvent";

interface State {
  // holidays
  year: string;
  holidays: IHoliday[];
  setHolidays: (holidays: IHoliday[]) => void;
  selectedHoliday: IHoliday | null;
  setSelectedHoliday: (holiday: IHoliday | null) => void;
  // events
  events: ICalendarEvent[];
  setEvents: (events: ICalendarEvent[]) => void;
  newEvent: ICalendarEvent | null;
  setNewEvent: (event: ICalendarEvent | null) => void;
  selectedEvent: ICalendarEvent | null;
  setSelectedEvent: (event: ICalendarEvent | null) => void;
  viewingEvent: ICalendarEvent | null;
  setViewingEvent: (event: ICalendarEvent | null) => void;
}

const useCalendarStore = create<State>()(
  persist(
    (set) => ({
      // holidays
      year: "",
      holidays: [],
      setHolidays: (holidays: IHoliday[]) => {
        set({ holidays, year: new Date().getFullYear().toString() });
      },
      selectedHoliday: null,
      setSelectedHoliday: (selectedHoliday) => set({ selectedHoliday }),
      // events
      events: [],
      setEvents: (events) => set({ events }),
      newEvent: null,
      setNewEvent: (newEvent) => set({ newEvent }),
      viewingEvent: null,
      setViewingEvent: (viewingEvent) => set({ viewingEvent }),
      selectedEvent: null,
      setSelectedEvent: (selectedEvent) => set({ selectedEvent }),
    }),
    {
      name: "calendar-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(
            ([key]) =>
              ![
                "events",
                "selectedEvent",
                "newEvent",
                "viewingEvent",
                "selectedEvent",
                "selectedHoliday",
              ].includes(key)
          )
        ),
    }
  )
);

export default useCalendarStore;
