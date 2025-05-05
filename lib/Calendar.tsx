import React, { useEffect } from "react";
import Navigation from "./components/Navigation";
import WeekDays from "./components/WeekDays";
import CalendarDays from "./components/CalendarDays/CalendarDays";
import { addMonths, format } from "date-fns";
import { Dialog, Icon } from "@vincentbcp/components-library";
import EventForm from "./components/EventForm";
import { ICalendarEvent } from "./interfaces/ICalendarEvent";
import useCalendar from "./hooks/useCalendar";
import { useSwipeable } from "react-swipeable";
import Popup from "./components/common/Popup";
import random from "random-string-generator";
import useEventStore from "./store/event.store";
import useCalendarStore from "./store/calendar.store";
import { cloneDeep } from "lodash";

export const Calendar: React.FC<{
  onBack?: () => void;
  events: ICalendarEvent[];
  onAddEvent: (event: ICalendarEvent) => Promise<boolean>;
  onDeleteEvent: (event: ICalendarEvent) => Promise<boolean>;
  onUpdateEvent: (event: ICalendarEvent) => Promise<boolean>;
}> = (props) => {
  const { events, onBack, onUpdateEvent, onAddEvent, onDeleteEvent } = props;

  const { currentDate, setCurrentDate, getHolidays } = useCalendar();

  const handlers = useSwipeable({
    onSwipedLeft: () => setCurrentDate(addMonths(currentDate, 1)),
    onSwipedRight: () => setCurrentDate(addMonths(currentDate, -1)),
  });

  const { setEvents, selectedEvent, setSelectedEvent } = useEventStore();
  const { selectedHoliday, setSelectedHoliday } = useCalendarStore();

  useEffect(() => {
    getHolidays();
  }, []);

  useEffect(() => {
    setEvents(events);
  }, [events]);

  return (
    <>
      <div className="w-full h-full" {...handlers}>
        <Navigation
          currentDate={currentDate}
          onChange={setCurrentDate}
          onBack={onBack}
        />
        <WeekDays />
        <CalendarDays currentDate={currentDate} />
      </div>
      <Dialog
        title={format(selectedEvent?.date || new Date(), "MMM dd, yyyy EEE")}
        open={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
      >
        <EventForm
          event={selectedEvent as any}
          onChange={setSelectedEvent}
          onSubmit={(event) =>
            event?.id
              ? onUpdateEvent(event)
              : onAddEvent({ ...event, id: random(10) })
          }
          onDelete={(event) => {
            setEvents(cloneDeep(events).filter((e) => e.id !== event.id));
            onDeleteEvent(event).catch(() => {});
          }}
          onClose={() => setSelectedEvent(null)}
        />
      </Dialog>
      {selectedHoliday && (
        <Popup
          open
          onClose={() => setSelectedHoliday(null)}
          anchorElId={`holiday_${selectedHoliday.date}`}
        >
          <div className="flex gap-4 md:!gap-6 items-start mb-6">
            <div className="w-4 h-4 mt-2 rounded-sm bg-green-700" />
            <div>
              <p className="text-sm md:!text-xl">{selectedHoliday.name}</p>
              <p className="font-light text-xs md:!text-sm">
                {format(new Date(selectedHoliday.date), "EEEE, MMM dd")}
              </p>
            </div>
          </div>
          <div className="flex gap-4 md:!gap-6 items-center">
            <Icon icon="menu" />
            <p className="font-light text-xs md:!text-sm">
              {selectedHoliday.type || "Public Holiday"}
            </p>
          </div>
        </Popup>
      )}
    </>
  );
};
