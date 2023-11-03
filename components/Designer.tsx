import React, { type ElementType } from "react";
import DesignerSidebar from "./DesignerSidebar";
import { type DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import useDesigner from "@/hooks/useDesigner";
import {
  type FormElementInstance,
  FormElements,
  type ElementsType,
} from "./FormElements";
import { idGenerator } from "@/lib/idGenerator";

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

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const isDesignerBtnElement = active?.data?.current?.isDesignerBtnElement;

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
            "m-auto flex h-full max-w-[920px] flex-1 flex-grow flex-col items-center justify-start overflow-y-auto rounded-xl bg-background",
            droppable.isOver && "ring-2 ring-primary/20",
          )}
        >
          {elements.length > 0 && (
            <div className="flex w-full flex-col gap-2 p-4 text-background">
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
            <div className="w-full p-4">
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

  const DesignerElement = FormElements[element.type].designerComponent;

  return (
    <div className="relative flex h-[120px] flex-col rounded-md text-foreground ring-1 ring-inset ring-accent hover:cursor-pointer">
      <div
        ref={topHalf.setNodeRef}
        className="absolute h-1/2 w-full rounded-t-md"
      />
      <div className="pointer-events-none flex h-[120px] w-full items-center rounded-md bg-accent/40 px-4 py-2">
        <DesignerElement elementInstance={element} />
      </div>
      <div
        ref={bottomHalf.setNodeRef}
        className="absolute bottom-0 h-1/2 w-full rounded-b-md"
      />
    </div>
  );
}

export default Designer;
