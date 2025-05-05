import clsx from "clsx";

const Event: React.FC<{
  id: string;
  title: string;
  bgColor: string;
  textColor: string;
  onClick: () => void;
}> = (props) => {
  const { id, title, bgColor, textColor, onClick } = props;

  return (
    <p
      id={id}
      className={clsx(
        `flex items-center overflow-hidden cursor-pointer select-none rounded-sm text-xs py-1 px-1 whitespace-nowrap`
      )}
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
      onClick={(ev) => {
        ev.stopPropagation();
        onClick();
      }}
    >
      {title}
    </p>
  );
};

export default Event;
