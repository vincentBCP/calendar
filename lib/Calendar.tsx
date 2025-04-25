import React, { useState } from "react";
import Navigation from "./components/Navigation";
import WeekDays from "./components/WeekDays";
import CalendarDays from "./components/CalendarDays/CalendarDays";
import { format, startOfMonth } from "date-fns";
import { Dialog } from "@vincentbcp/components-library";

export const Calendar: React.FC<{ onBack?: () => void }> = (props) => {
  const { onBack } = props;

  const [currentDate, setCurrentDate] = useState(startOfMonth(new Date()));
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  return (
    <>
      <div>
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
        <h1>Add event here.</h1>
      </Dialog>
    </>
  );
};
