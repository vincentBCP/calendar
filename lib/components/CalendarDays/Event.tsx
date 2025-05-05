import clsx from "clsx";
import useCalendarStore from "../../store/calendar.store";

const Event: React.FC<{
  id: string;
  title: string;
  bgColor: string;
  textColor: string;
  onClick: () => void;
}> = (props) => {
  const { id, title, bgColor, textColor, onClick } = props;
  const { setSelectedHoliday, setViewingEvent } = useCalendarStore();

  return (
    <p
      id={id}
      className={clsx(
        `shrink-0 flex items-center overflow-hidden cursor-pointer select-none rounded-sm text-xs py-1 px-1 whitespace-nowrap`
      )}
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
      onClick={(ev) => {
        ev.stopPropagation();
        setViewingEvent(null);
        setSelectedHoliday(null);
        onClick();
      }}
    >
      {title}
    </p>
  );
};

export default Event;
