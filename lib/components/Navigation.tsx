import { Icon } from "@vincentbcp/components-library";
import { addMonths, format, startOfMonth } from "date-fns";
import React from "react";

const Navigation: React.FC<{
  currentDate: Date;
  onChange: (d: Date) => void;
}> = (props) => {
  const { currentDate, onChange } = props;

  return (
    <div className="select-none p-4 flex items-center border-b border-zinc-200">
      <button
        className="rounded border border-zinc-200 bg-white px-4 py-2 uppercase text-xs mr-6 cursor-pointer hover:bg-zinc-100 duration-300"
        onClick={() => onChange(startOfMonth(new Date()))}
      >
        today
      </button>
      <Icon
        icon="chevron-left"
        className="mr-4 hover:!outline-6"
        feedbackOnHover
        onClick={() => onChange(addMonths(currentDate, -1))}
      />
      <Icon
        icon="chevron-right"
        className="mr-6 hover:!outline-6"
        feedbackOnHover
        onClick={() => onChange(addMonths(currentDate, 1))}
      />
      <span className="text-lg">{format(currentDate, "MMMM yyyy")}</span>
    </div>
  );
};

export default Navigation;
