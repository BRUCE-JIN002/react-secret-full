import { CSSProperties, PropsWithChildren, ReactNode } from "react";
import {
  useInteractions,
  useFloating,
  useClick,
  useHover,
  useDismiss,
  offset,
  arrow,
  FloatingArrow,
  flip,
} from "@floating-ui/react";
import { useRef, useState } from "react";
import "./styles.scss";

type Alignment = "start" | "end";
export type Side = "top" | "right" | "bottom" | "left";
export type AlignedPlacement = `${Side}-${Alignment}`;

interface PopoverProps extends PropsWithChildren {
  content: ReactNode;
  trigger?: "hover" | "click";
  showArrow?: boolean;
  placement?: Side | AlignedPlacement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  style?: CSSProperties;
}

const Popover: React.FC<PopoverProps> = (props) => {
  const {
    open,
    onOpenChange,
    content,
    children,
    showArrow = true,
    trigger = "hover",
    placement = "top",
    className,
    style,
  } = props;

  const arrowRef = useRef(null);

  const [isOpen, setIsOpen] = useState(open);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: (open) => {
      setIsOpen(open);
      onOpenChange?.(open);
    },
    placement,
    middleware: [
      offset(10),
      arrow({
        element: arrowRef,
      }),
      flip(),
    ],
  });

  const hover = useHover(context);
  const click = useClick(context);
  const interaction = trigger === "hover" ? hover : click;

  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    interaction,
    dismiss,
  ]);

  return (
    <>
      <span
        ref={refs.setReference}
        {...getReferenceProps()}
        className={className}
        style={style}
      >
        {children}
      </span>
      {isOpen && (
        <div
          className="floating"
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
        >
          {content}
          {showArrow && (
            <FloatingArrow
              ref={arrowRef}
              context={context}
              fill="#fff"
              // stroke="#000"
              strokeWidth={1}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Popover;
