import { Icon, useClickAway } from "@vincentbcp/components-library";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

const POPUP_WIDTH = 300;
const POPUP_WIDTH_MOBILE = 220;
const POPUP_HEIGHT = 180;
const POPUP_HEIGHT_MOBILE = 120;

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

  useClickAway([anchorElId, "popup"], () => {
    setLoc(undefined);
    onClose();
  });

  useEffect(() => {
    if (open) {
      const checkLoc = (width: number, height: number, mobile?: boolean) => {
        const anchorEl = document.getElementById(anchorElId);
        if (!anchorEl) return;

        const rect = anchorEl.getBoundingClientRect();
        let x = mobile ? rect.left : rect.left + rect.width + 8;
        let y = mobile ? rect.top + 20 : rect.top;
        let dir: any = "right";

        if (y + height > window.innerHeight) {
          y = mobile ? rect.top - height - 24 : rect.top - height;
          x = rect.left;
          dir = "top";
        }

        if (x + width > window.innerWidth) {
          x = mobile ? rect.left - width + rect.width : rect.left - width - 8;
          dir = "left";
        }

        setLoc({ x, y, dir });
      };

      if (mobile) {
        checkLoc(POPUP_WIDTH_MOBILE, POPUP_HEIGHT_MOBILE, true);
      } else {
        checkLoc(POPUP_WIDTH, POPUP_HEIGHT);
      }
    } else {
      setLoc(undefined);
    }
  }, [open, mobile, anchorElId]);

  if (!loc) return null;

  return (
    <div
      className="duration-300 popup flex flex-col z-10 fixed bg-gray-100 rounded-xl p-4 md:!p-6 w-[220px] md:!w-[300px] shadow-lg text-black"
      style={{
        top: loc.y,
        left: loc.x,
      }}
      onClick={(ev) => ev.stopPropagation()}
    >
      <Icon
        icon="close"
        color="black"
        className="self-end mb-4 cursor-pointer"
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
