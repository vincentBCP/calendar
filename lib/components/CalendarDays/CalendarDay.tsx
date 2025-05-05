import clsx from "clsx";
import { format } from "date-fns";
import useCalendarStore from "../../store/calendar.store";
import { useMemo } from "react";
import Event from "./Event";

const CalendarDay: React.FC<{
  date: Date;
  currentDate: Date;
}> = (props) => {
  const { date, currentDate } = props;
  const { holidays, setSelectedHoliday, events, setNewEvent, setViewingEvent } =
    useCalendarStore();

  const inTheCurrentMonth = format(date, "MM") === format(currentDate, "MM");
  const today = format(date, "MM-dd") === format(new Date(), "MM-dd");

  const holiday = useMemo(() => {
    return holidays.find((hol) => hol.date === format(date, "yyyy-MM-dd"));
  }, [holidays]);

  const dayEvents = useMemo(() => {
    return events.filter((event) => event.date === format(date, "yyyy-MM-dd"));
  }, [events, date]);

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
      onClick={() =>
        setNewEvent({
          id: "new_event",
          title: "",
          date: format(date, "yyyy-MM-dd"),
          time: "",
          bgColor: "#0000ff",
          textColor: "#ffffff",
        })
      }
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
        <Event
          id={`holiday_${holiday.date}`}
          title={holiday.name}
          bgColor="#008236"
          textColor="#ffffff"
          onClick={() => {
            setViewingEvent(null);
            setSelectedHoliday(holiday);
          }}
        />
      )}
      {dayEvents.map((event) => (
        <Event
          id={`event_${event.id}`}
          key={`event_${event.id}`}
          title={`${format(new Date(`1990-01-01 ${event.time}`), "h:mmaaa")} ${
            event.title
          }`}
          bgColor={event.bgColor}
          textColor={event.textColor}
          onClick={() => {
            setSelectedHoliday(null);
            setViewingEvent(event);
          }}
        />
      ))}
    </div>
  );
};

export default CalendarDay;
