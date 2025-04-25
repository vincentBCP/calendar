import clsx from "clsx";
import { format } from "date-fns";

const CalendarDay: React.FC<{ date: Date; currentDate: Date }> = (props) => {
  const { date, currentDate } = props;

  const inTheCurrentMonth = format(date, "MM") === format(currentDate, "MM");
  const today = format(date, "MM-dd") === format(new Date(), "MM-dd");

  return (
    <div
      className={clsx(
        "flex flex-col items-center py-2 h-[120px] border-b border-r border-zinc-200",
        {
          "[&:nth-of-type(1)]:border-l": true,
          "[&:nth-of-type(8)]:border-l": true,
          "[&:nth-of-type(15)]:border-l": true,
          "[&:nth-of-type(22)]:border-l": true,
          "[&:nth-of-type(29)]:border-l": true,
          "[&:nth-of-type(36)]:border-l": true,
        }
      )}
    >
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
  );
};

export default CalendarDay;
