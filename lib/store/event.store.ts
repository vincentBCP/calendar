import { create } from "zustand";
import { ICalendarEvent } from "../interfaces/ICalendarEvent";

interface IState {
  events: ICalendarEvent[];
  setEvents: (events: ICalendarEvent[]) => void;
  selectedEvent: ICalendarEvent | null;
  setSelectedEvent: (event: ICalendarEvent | null) => void;
}

const useEventStore = create<IState>()((set) => ({
  events: [],
  setEvents: (events) => set({ events }),
  selectedEvent: null,
  setSelectedEvent: (selectedEvent) => set({ selectedEvent }),
}));

export default useEventStore;
