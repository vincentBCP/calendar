import React, { useEffect } from "react";
import Navigation from "./components/Navigation";
import WeekDays from "./components/WeekDays";
import CalendarDays from "./components/CalendarDays/CalendarDays";
import { addMonths, format } from "date-fns";
import { Icon } from "@vincentbcp/components-library";
import { ICalendarEvent } from "./interfaces/ICalendarEvent";
import useCalendar from "./hooks/useCalendar";
import { useSwipeable } from "react-swipeable";
import Popup from "./components/common/Popup";
import random from "random-string-generator";
import useCalendarStore from "./store/calendar.store";
import { cloneDeep } from "lodash";
import EventDialog from "./components/EventDialog";

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

  const {
    selectedHoliday,
    setSelectedHoliday,
    setEvents,
    newEvent,
    setNewEvent,
    viewingEvent,
    setViewingEvent,
    selectedEvent,
    setSelectedEvent,
  } = useCalendarStore();

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
      {(!!newEvent || !!selectedEvent) && (
        <EventDialog
          title={format(
            newEvent?.date || selectedEvent?.date || new Date(),
            "MMM dd, yyyy EEE"
          )}
          open
          onClose={() => {
            setNewEvent(null);
            setSelectedEvent(null);
          }}
          event={(newEvent || selectedEvent) as any}
          onChange={newEvent ? setNewEvent : setSelectedEvent}
          onSubmit={(event) => {
            const req = selectedEvent
              ? onUpdateEvent(event)
              : onAddEvent({ ...event, id: random(10) });

            return req.then((b) => {
              setNewEvent(null);
              setSelectedEvent(null);
              return b;
            });
          }}
          onDelete={(event) => {
            setEvents(cloneDeep(events).filter((e) => e.id !== event.id));
            onDeleteEvent(event).catch(() => {});
            setNewEvent(null);
            setSelectedEvent(null);
          }}
        />
      )}
      {(selectedHoliday || viewingEvent) && (
        <Popup
          id="calendar_popup"
          open
          {...(selectedHoliday
            ? {
                onClose: () => setSelectedHoliday(null),
                anchorElId: `holiday_${selectedHoliday.date}`,
              }
            : {
                onClose: () => setViewingEvent(null),
                anchorElId: `event_${viewingEvent?.id}`,
                actions: (
                  <Icon
                    icon="pencil"
                    color="black"
                    className="cursor-pointer"
                    onClick={() => {
                      setSelectedEvent({ ...(viewingEvent as any) });
                      setViewingEvent(null);
                    }}
                  />
                ),
              })}
        >
          {selectedHoliday && (
            <>
              <div className="flex gap-4 md:!gap-6 items-start mb-6">
                <div className="w-4 h-4 mt-2 rounded-sm bg-green-700 shrink-0" />
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
            </>
          )}
          {viewingEvent && (
            <>
              <div className="flex gap-4 md:!gap-6 items-start mb-6">
                <div
                  className="w-4 h-4 mt-2 rounded-sm shrink-0"
                  style={{ backgroundColor: viewingEvent?.bgColor }}
                />
                <div>
                  <p className="text-sm md:!text-xl">{viewingEvent.title}</p>
                  <p className="font-light text-xs md:!text-sm">
                    {format(new Date(viewingEvent.date), "EEEE, MMM dd")}
                  </p>
                </div>
              </div>
              <div className="flex gap-4 md:!gap-6 items-center">
                <Icon icon="clock" />
                <p className="font-light text-xs md:!text-sm">
                  {format(
                    new Date(`1990-01-01 ${viewingEvent.time}`),
                    "h:mmaaa"
                  )}
                </p>
              </div>
            </>
          )}
        </Popup>
      )}
    </>
  );
};
