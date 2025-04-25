const WeekDays: React.FC = () => {
  return (
    <div className="w-full grid grid-cols-7">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((dayOfWeek) => (
        <span className="capitalize text-xs text-center p-1 [&:first-of-type]:border-l border-r border-zinc-200">
          {dayOfWeek}
        </span>
      ))}
    </div>
  );
};

export default WeekDays;
