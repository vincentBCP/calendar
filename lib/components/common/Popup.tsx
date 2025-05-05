import { Icon, useClickAway } from "@vincentbcp/components-library";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";

const Popup: React.FC<{
  id: string;
  anchorElId: string;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode | React.ReactNode[];
  actions?: React.ReactNode;
}> = (props) => {
  const { id, anchorElId, open, onClose, children, actions } = props;

  const mobile = useMediaQuery({ query: "(max-width: 600px)" });
  const [loc, setLoc] = useState<
    { x: number; y: number; dir: "left" | "right" | "top" } | undefined
  >();
  const [duration, setDuration] = useState("0");

  const elemRef = useRef<HTMLDivElement>(null);

  useClickAway([anchorElId, id], () => {
    setLoc(undefined);
    onClose();
  });

  useEffect(() => {
    if (open) {
      const checkLoc = () => {
        const height = elemRef.current?.getBoundingClientRect().height || 0;
        const width = elemRef.current?.getBoundingClientRect().width || 0;

        const anchorEl = document.getElementById(anchorElId);
        if (!anchorEl) return;

        const rect = anchorEl.getBoundingClientRect();
        let x = mobile ? rect.left : rect.left + rect.width + 8;
        let y = mobile ? rect.top + 28 : rect.top;
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
      }, 50);
    } else {
      setLoc(undefined);
      setDuration("0");
    }
  }, [open, mobile, anchorElId]);

  return (
    <div
      ref={elemRef}
      className={`${id} flex flex-col z-10 fixed bg-gray-100 rounded-xl p-4 md:!p-6 w-[calc((100%/7)*3.7)] md:!w-[300px] shadow-lg text-black`}
      style={{
        transitionDuration: duration,
        visibility: loc?.y ? "visible" : "hidden",
        top: loc?.y || 0,
        left: loc?.x || 0,
      }}
      onClick={(ev) => ev.stopPropagation()}
    >
      <div className="flex items-center justify-end gap-4 mb-4">
        {actions && actions}
        <Icon
          icon="close"
          color="black"
          className="cursor-pointer"
          onClick={() => {
            setLoc(undefined);
            onClose();
          }}
        />
      </div>
      {children}
    </div>
  );
};

export default Popup;
