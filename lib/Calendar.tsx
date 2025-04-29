import React, { useEffect, useState } from "react";
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
import { IHoliday } from "./interfaces/IHoliday";

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
  const [selectedHoliday, setSelectedHoliday] = useState<
    IHoliday | undefined
  >();

  const handlers = useSwipeable({
    onSwipedLeft: () => setCurrentDate(addMonths(currentDate, 1)),
    onSwipedRight: () => setCurrentDate(addMonths(currentDate, -1)),
  });

  useEffect(() => {
    getHolidays();
  }, []);

  return (
    <>
      <div className="w-full h-full" {...handlers}>
        <Navigation
          currentDate={currentDate}
          onChange={setCurrentDate}
          onBack={onBack}
        />
        <WeekDays />
        <CalendarDays
          currentDate={currentDate}
          onDayClick={(date) => setSelectedDate(date)}
          onHolidayClick={setSelectedHoliday}
        />
      </div>
      <Dialog
        title={format(selectedDate || new Date(), "MMM dd, yyyy EEE")}
        open={!!selectedDate}
        onClose={() => setSelectedDate(undefined)}
      >
        <EventForm date={selectedDate || new Date()} />
      </Dialog>
      {selectedHoliday && (
        <Popup
          open
          onClose={() => setSelectedHoliday(undefined)}
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
