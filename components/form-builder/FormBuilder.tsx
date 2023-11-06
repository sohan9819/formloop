"use client";

import React from "react";
import { type Form } from "@prisma/client";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import PublishFormBtn from "@/components/form-builder/PublishFormBtn";
import SaveFormBtn from "@/components/form-builder/SaveFormBtn";
import PreviewDialogBtn from "@/components/form-builder/PreviewDialogBtn";
import Designer from "@/components/form-builder/Designer";
import DragOverlayWrapper from "@/components/form-builder/DragOverlayWrapper";
import useDesigner from "@/hooks/useDesigner";

const FormBuilder = ({ form }: { form: Form }) => {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, // 10px
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300, // 300ms
      tolerance: 5, // 5px
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  const { setSelectedElement } = useDesigner();

  return (
    <DndContext sensors={sensors}>
      <main className="flex w-full flex-col">
        <nav className="flex items-center justify-between gap-3 border-b-2 p-4">
          <h2 className="truncate font-medium">
            <span className="mr-2 text-muted-foreground">Form:</span>
            {form.name}
          </h2>
          <div className="flex items-center gap-2">
            <PreviewDialogBtn />
            {!form.published && (
              <>
                <SaveFormBtn />
                <PublishFormBtn />
              </>
            )}
          </div>
        </nav>
        <div
          className="relative flex h-[200px] w-full flex-grow items-center justify-center overflow-y-auto bg-accent bg-[url(/paper-light.svg)] dark:bg-[url(/paper-dark.svg)]"
          onClick={() => void setSelectedElement(null)}
        >
          <Designer />
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
};

export default FormBuilder;

// Timestamp : 1:08:11
