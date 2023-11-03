import React, { useState } from "react";
import { useDndMonitor, DragOverlay, type Active } from "@dnd-kit/core";
import { SidebarBtnElementDragOverlay } from "./SidebarBtnElement";
import { type ElementsType, FormElements } from "./FormElements";

const DragOverlayWrapper = () => {
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);

  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active);
    },
    onDragCancel: () => {
      setDraggedItem(null);
    },
    onDragEnd: () => {
      setDraggedItem(null);
    },
  });

  let node = <div>No drag overlay</div>;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const isSidebarBtnElement = draggedItem?.data?.current?.isDesignerBtnElement;

  if (isSidebarBtnElement) {
    const type = draggedItem?.data?.current?.type as ElementsType;
    node = <SidebarBtnElementDragOverlay formElement={FormElements[type]} />;
  }

  return <DragOverlay>{node}</DragOverlay>;
};

export default DragOverlayWrapper;
