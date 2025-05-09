import { addDays, endOfMonth, format, getDay, startOfMonth } from "date-fns";
import CalendarDay from "./CalendarDay";

const CalendarDays: React.FC<{
  currentDate: Date;
}> = (props) => {
  const { currentDate } = props;

  const renderDays = () => {
    const firstDate = startOfMonth(currentDate);
    const lastDate = endOfMonth(currentDate);

    const firstDateDayNum = getDay(firstDate);
    const lastDateDayNum = getDay(lastDate);

    const startDate =
      firstDateDayNum !== 0
        ? addDays(firstDate, 0 - firstDateDayNum)
        : firstDate;
    const endDate =
      lastDateDayNum !== 6 ? addDays(lastDate, 6 - lastDateDayNum) : lastDate;

    let temp = startDate;

    const days: React.ReactNode[] = [];

    const addDayToList = (date: Date) => {
      days.push(
        <CalendarDay
          key={date.toDateString()}
          date={date}
          currentDate={currentDate}
        />
      );
    };

    do {
      addDayToList(temp);

      temp = addDays(temp, 1);
    } while (format(temp, "yyyy-MM-dd") !== format(endDate, "yyyy-MM-dd"));

    addDayToList(endDate);

    return days;
  };

  return <div className="grid grid-cols-7">{renderDays()}</div>;
};

export default CalendarDays;
