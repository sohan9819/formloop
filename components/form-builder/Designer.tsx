import React, { useState } from "react";
import {
  type DragEndEvent,
  useDndMonitor,
  useDroppable,
  useDraggable,
} from "@dnd-kit/core";
import { BiSolidTrash } from "react-icons/bi";

import DesignerSidebar from "@/components/form-builder/DesignerSidebar";
import useDesigner from "@/hooks/useDesigner";
import {
  type FormElementInstance,
  FormElements,
  type ElementsType,
} from "./FormElements";
import { idGenerator } from "@/lib/idGenerator";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const Designer = () => {
  const { elements, addElement } = useDesigner();

  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) return;

      console.log("isDesignerBtnElement  : ", active?.data?.current);

      const isDesignerBtnElement = active?.data?.current
        ?.isDesignerBtnElement as boolean;

      if (isDesignerBtnElement) {
        const type = active.data?.current?.type as ElementsType;
        const newElement = FormElements[type].construct(idGenerator());

        addElement(0, newElement);

        console.log("NEW ELEMENT", newElement);
      }
    },
  });

  return (
    <div className="flex h-full w-full">
      <div className="flex w-full p-4">
        <div
          ref={droppable.setNodeRef}
          className={cn(
            "m-auto flex h-full max-w-[920px] flex-1 flex-grow flex-col items-center justify-start gap-2 overflow-y-auto rounded-xl bg-background p-4",
            droppable.isOver && "ring-2 ring-primary/20",
          )}
        >
          {elements.length > 0 && (
            <div className="flex w-full flex-col gap-2 text-background">
              {elements.map((element) => (
                <DesignerElementWrapper key={element.id} element={element} />
              ))}
            </div>
          )}
          {!droppable.isOver && elements.length === 0 && (
            <p className="flex flex-grow items-center text-3xl font-bold text-muted-foreground">
              Drop Here
            </p>
          )}
          {droppable.isOver && (
            <div className="w-full">
              <div className="h-[120px] rounded-md bg-primary/20"></div>
            </div>
          )}
        </div>
      </div>
      <DesignerSidebar />
    </div>
  );
};

function DesignerElementWrapper({ element }: { element: FormElementInstance }) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const { removeElement } = useDesigner();

  const topHalf = useDroppable({
    id: element.id + "-top",
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
    },
  });

  const bottomHalf = useDroppable({
    id: element.id + "-bottom",
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
    },
  });

  const draggable = useDraggable({
    id: element.id,
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    },
  });

  // if (draggable.isDragging) return null;
  if (draggable.isDragging)
    return (
      <div className="relative flex h-[120px] flex-col overflow-hidden rounded-md bg-accent/20 text-foreground ring-1 ring-inset ring-accent hover:cursor-pointer"></div>
    );

  const DesignerElement = FormElements[element.type].designerComponent;

  return (
    <div
      className="relative flex h-[120px] flex-col overflow-hidden rounded-md text-foreground ring-1 ring-inset ring-accent hover:cursor-pointer"
      onMouseEnter={() => void setMouseIsOver(true)}
      onMouseLeave={() => void setMouseIsOver(false)}
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <div
        ref={topHalf.setNodeRef}
        className={cn(
          "absolute h-1/2 w-full",
          topHalf.isOver && "border-t-4 border-t-foreground/50",
        )}
      />
      <div
        className={cn(
          "pointer-events-none flex h-[120px] w-full items-center rounded-md bg-accent/40 px-4 py-2",
          mouseIsOver && "opacity-30",
        )}
      >
        <DesignerElement elementInstance={element} />
      </div>
      <div
        ref={bottomHalf.setNodeRef}
        className={cn(
          "absolute bottom-0 h-1/2 w-full",
          bottomHalf.isOver && "border-b-4 border-b-foreground/50",
        )}
      />
      {mouseIsOver && (
        <div className="absolute flex h-full w-full items-center justify-center">
          <p className="w-full text-center text-sm text-muted-foreground">
            Click for properties or drag to move
          </p>
          <Button
            variant={"destructive"}
            className="ml-auto h-full"
            onClick={() => void removeElement(element.id)}
          >
            <BiSolidTrash className="h-6 w-6" />
          </Button>
        </div>
      )}
    </div>
  );
}

export default Designer;
