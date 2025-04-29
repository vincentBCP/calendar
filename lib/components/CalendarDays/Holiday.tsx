import clsx from "clsx";
import { IHoliday } from "../../interfaces/IHoliday";

const Holiday: React.FC<{ holiday: IHoliday; onClick: () => void }> = (
  props
) => {
  const { holiday, onClick } = props;

  return (
    <p
      id={`holiday_${holiday.date}`}
      className={clsx(
        `overflow-hidden cursor-pointer select-none bg-green-700 text-white rounded-sm text-xs px-1 md:!px-2 whitespace-nowrap`,
        {
          "md:!rounded-md md:!text-sm md:hover:!bg-green-800": true,
        }
      )}
      onClick={(ev) => {
        ev.stopPropagation();
        onClick();
      }}
    >
      {holiday.name}
    </p>
  );
};

export default Holiday;
