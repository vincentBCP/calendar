import { Icon } from "@vincentbcp/components-library";
import { addMonths, format, startOfMonth } from "date-fns";
import React from "react";

const Navigation: React.FC<{
  currentDate: Date;
  onChange: (d: Date) => void;
  onBack?: () => void;
}> = (props) => {
  const { currentDate, onChange, onBack } = props;

  return (
    <div className="select-none p-4 flex items-center border-b border-zinc-200 bg-gray-100">
      {onBack && (
        <Icon
          icon="arrow-left2"
          className="mr-6"
          feedbackOnHover
          onClick={onBack}
        />
      )}
      <button
        className="rounded-full border border-black px-4 py-2 uppercase text-xs mr-6 cursor-pointer md:hover:bg-gray-200 duration-300"
        onClick={() => onChange(startOfMonth(new Date()))}
      >
        today
      </button>
      <Icon
        icon="chevron-left"
        className="mr-4 md:hover:!outline-6"
        feedbackOnHover
        onClick={() => onChange(addMonths(currentDate, -1))}
      />
      <Icon
        icon="chevron-right"
        className="mr-auto md:hover:!outline-6"
        feedbackOnHover
        onClick={() => onChange(addMonths(currentDate, 1))}
      />
      <span className="text-lg">{format(currentDate, "MMMM yyyy")}</span>
    </div>
  );
};

export default Navigation;
