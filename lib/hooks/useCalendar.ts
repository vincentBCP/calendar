import { format, startOfMonth } from "date-fns";
import useCalendarStore from "../store/calendar.store";
import { useState } from "react";

const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(startOfMonth(new Date()));

  const { year, setHolidays } = useCalendarStore();

  const getHolidays = () => {
    if (year === format(new Date(), "yyyy")) return;

    fetch(
      `https://getphholidays-bmybisdk5a-uc.a.run.app?year=${currentDate.getFullYear()}`
    )
      .then((response) => response.json())
      .then((data) => setHolidays(data.data))
      .catch((err) => console.log("Failed to retrieve holidays!", err));
  };

  return { getHolidays, currentDate, setCurrentDate };
};

export default useCalendar;
