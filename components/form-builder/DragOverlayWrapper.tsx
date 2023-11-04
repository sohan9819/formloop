import React, { useState } from "react";

import { useDndMonitor, DragOverlay, type Active } from "@dnd-kit/core";
import { SidebarBtnElementDragOverlay } from "@/components/form-builder/SidebarBtnElement";
import {
  type ElementsType,
  FormElements,
} from "@/components/form-builder/FormElements";
import useDesigner from "@/hooks/useDesigner";

const DragOverlayWrapper = () => {
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);
  const { elements } = useDesigner();

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
  const isSidebarBtnElement = draggedItem?.data?.current
    ?.isDesignerBtnElement as boolean;

  if (isSidebarBtnElement) {
    const type = draggedItem?.data?.current?.type as ElementsType;
    node = <SidebarBtnElementDragOverlay formElement={FormElements[type]} />;
  }

  const isDesignerElement = draggedItem?.data?.current
    ?.isDesignerElement as boolean;

  if (isDesignerElement) {
    const elementId = draggedItem?.data?.current?.elementId as string;
    const element = elements.find((el) => el.id === elementId);
    if (!element) node = <div>Element Not Found!</div>;
    else {
      const DesignerElement = FormElements[element.type].designerComponent;
      node = (
        <div className="pointer-events-none flex h-[120px] w-full items-center rounded-md bg-accent px-4 py-2">
          <DesignerElement elementInstance={element} />
        </div>
      );
    }
  }

  return <DragOverlay>{node}</DragOverlay>;
};

export default DragOverlayWrapper;
