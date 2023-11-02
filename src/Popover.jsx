import { useState } from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  useTransitionStyles,
} from '@floating-ui/react';
import "./styles.css";

export default function Popover() {
  const [isOpen, setIsOpen] = useState(false);

  const {refs, floatingStyles, context} = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(10), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  // Merge all the interactions into prop getters
  const {getReferenceProps, getFloatingProps} = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const {isMounted, styles} = useTransitionStyles(context, {
    duration: {
      open: 300,
      close: 100,
    },
    initial: ({ side }) => ({
      opacity: 0,
      transform: side === 'top' ? 'translateY(5px)' : 'translateY(-5px)'
    }),
  });

  return (
    <>
      <button ref={refs.setReference} {...getReferenceProps()}>
        Reference element
      </button>
      {isMounted && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
        >
          <div style={{...styles}} className="floating">
            Popover element
          </div>
        </div>
      )}
    </>
  );
}
