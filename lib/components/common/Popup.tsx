import { Icon, useClickAway } from "@vincentbcp/components-library";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";

const POPUP_WIDTH = 300;
const POPUP_WIDTH_MOBILE = (window.innerWidth / 7) * 3.8;

const Popup: React.FC<{
  anchorElId: string;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode | React.ReactNode[];
}> = (props) => {
  const { anchorElId, open, onClose, children } = props;

  const mobile = useMediaQuery({ query: "(max-width: 600px)" });
  const [loc, setLoc] = useState<
    { x: number; y: number; dir: "left" | "right" | "top" } | undefined
  >();
  const [duration, setDuration] = useState("0");

  const elemRef = useRef<HTMLDivElement>(null);

  useClickAway([anchorElId, "popup"], () => {
    setLoc(undefined);
    onClose();
  });

  useEffect(() => {
    if (open) {
      const checkLoc = () => {
        const height = elemRef.current?.getBoundingClientRect().height || 0;
        const width = mobile ? POPUP_WIDTH_MOBILE : POPUP_WIDTH;

        const anchorEl = document.getElementById(anchorElId);
        if (!anchorEl) return;

        const rect = anchorEl.getBoundingClientRect();
        let x = mobile ? rect.left : rect.left + rect.width + 8;
        let y = mobile ? rect.top + 20 : rect.top;
        let dir: any = "right";

        if (y + height > window.innerHeight) {
          y = mobile ? rect.top - height - 4 : rect.top - height - 8;
          x = rect.left;
          dir = "top";
        }

        if (x + width > window.innerWidth) {
          x = mobile
            ? rect.left - width + rect.width + 4
            : rect.left - width - 8;
          dir = "left";
        }

        setLoc({ x, y, dir });
        setTimeout(() => setDuration("300ms"), 10);
      };

      setTimeout(() => {
        checkLoc();
      }, 10);
    } else {
      setLoc(undefined);
      setDuration("0");
    }
  }, [open, mobile, anchorElId]);

  return (
    <div
      ref={elemRef}
      className={`popup flex flex-col z-10 fixed bg-gray-100 rounded-xl p-4 md:!p-6 w-[calc((100%/7)*3.7)] md:!w-[300px] shadow-lg text-black`}
      style={{
        transitionDuration: duration,
        visibility: loc?.y ? "visible" : "hidden",
        top: loc?.y || 0,
        left: loc?.x || 0,
      }}
      onClick={(ev) => ev.stopPropagation()}
    >
      <Icon
        icon="close"
        color="black"
        className="self-end mb-2 md:!mb-4 cursor-pointer"
        onClick={() => {
          setLoc(undefined);
          onClose();
        }}
      />
      {children}
    </div>
  );
};

export default Popup;
