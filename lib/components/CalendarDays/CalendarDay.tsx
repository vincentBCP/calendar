import clsx from "clsx";
import { format } from "date-fns";
import useCalendarStore from "../../../src/store/calendar.store";
import { useMemo } from "react";

const CalendarDay: React.FC<{
  date: Date;
  currentDate: Date;
  onClick: () => void;
}> = (props) => {
  const { date, currentDate, onClick } = props;
  const { holidays } = useCalendarStore();

  const inTheCurrentMonth = format(date, "MM") === format(currentDate, "MM");
  const today = format(date, "MM-dd") === format(new Date(), "MM-dd");

  const holiday = useMemo(() => {
    return holidays.find((hol) => hol.date === format(date, "yyyy-MM-dd"));
  }, [holidays]);

  return (
    <div
      className={clsx(
        "flex flex-col py-2 h-[120px] border-b border-r border-zinc-200 px-1 gap-1",
        {
          "[&:nth-of-type(1)]:border-l": true,
          "[&:nth-of-type(8)]:border-l": true,
          "[&:nth-of-type(15)]:border-l": true,
          "[&:nth-of-type(22)]:border-l": true,
          "[&:nth-of-type(29)]:border-l": true,
          "[&:nth-of-type(36)]:border-l": true,
        }
      )}
      onClick={onClick}
    >
      <div className="flex justify-center">
        <span
          className={clsx(
            "flex items-center justify-center w-7 h-7 capitalize text-sm",
            {
              "text-zinc-400": !inTheCurrentMonth,
              "text-white rounded-full bg-blue-500": today,
            }
          )}
        >
          {format(date, "dd")}
        </span>
      </div>
      {holiday && (
        <p className="bg-green-700 text-white rounded-sm md:!rounded-md text-xs md:!text-sm px-1 md:!px-2 overflow-hidden whitespace-nowrap">
          {holiday.name}
        </p>
      )}
    </div>
  );
};

export default CalendarDay;
