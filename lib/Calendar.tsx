import React, { useState } from "react";
import Navigation from "./components/Navigation";
import WeekDays from "./components/WeekDays";
import CalendarDays from "./components/CalendarDays/CalendarDays";
import { startOfMonth } from "date-fns";

export const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(startOfMonth(new Date()));

  return (
    <div>
      <Navigation currentDate={currentDate} onChange={setCurrentDate} />
      <WeekDays />
      <CalendarDays currentDate={currentDate} />
    </div>
  );
};
