import React, { useEffect, useState } from "react";
import Navigation from "./components/Navigation";
import WeekDays from "./components/WeekDays";
import CalendarDays from "./components/CalendarDays/CalendarDays";
import { format } from "date-fns";
import { Dialog } from "@vincentbcp/components-library";
import EventForm from "./components/EventForm";
import { ICalendarEvent } from "./interfaces/ICalendarEvent";
import useCalendar from "./hooks/useCalendar";

export const Calendar: React.FC<{
  onBack?: () => void;
  events: ICalendarEvent[];
  onAddEvent: (event: ICalendarEvent) => Promise<boolean>;
  onDeleteEvent: (event: ICalendarEvent) => Promise<boolean>;
  onUpdateEvent: (event: ICalendarEvent) => Promise<boolean>;
}> = (props) => {
  const { onBack } = props;

  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const { currentDate, setCurrentDate, getHolidays } = useCalendar();

  useEffect(() => {
    getHolidays();
  }, []);

  return (
    <>
      <div className="w-full h-full">
        <Navigation
          currentDate={currentDate}
          onChange={setCurrentDate}
          onBack={onBack}
        />
        <WeekDays />
        <CalendarDays
          currentDate={currentDate}
          onDayClick={(date) => setSelectedDate(date)}
        />
      </div>
      <Dialog
        title={format(selectedDate || new Date(), "MMM dd, yyyy EEE")}
        open={!!selectedDate}
        onClose={() => setSelectedDate(undefined)}
      >
        <EventForm date={selectedDate || new Date()} />
      </Dialog>
    </>
  );
};
