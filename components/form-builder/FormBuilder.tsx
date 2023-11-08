"use client";

import React, { useEffect, useState } from "react";
import { type Form } from "@prisma/client";
import Confetti from "react-confetti";
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
import { type FormElementInstance } from "./FormElements";
import ShareLinkButton from "@/components/ShareLinkButton";

const FormBuilder = ({ form }: { form: Form }) => {
  const [shareLinkState, setShareLinkState] = useState(false);

  useEffect(() => {
    if (form.published) {
      setShareLinkState(true);
    }
  }, [form]);

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

  const { setElements, setSelectedElement } = useDesigner();

  useEffect(() => {
    const formElements = JSON.parse(form.content) as FormElementInstance[];
    setElements(formElements);
  }, [form, setElements]);

  // if (form.published)
  //   return (
  //     <>
  //       <Confetti
  //         width={window.innerWidth}
  //         height={window.innerHeight}
  //         recycle={false}
  //       />
  //       <ShareLinkButton
  //         showButton={false}
  //         id={form.id}
  //         open={shareLinkState}
  //         onOpenChange={setShareLinkState}
  //       />
  //     </>
  //   );

  return shareLinkState ? (
    <>
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
      />
      <ShareLinkButton
        showButton={false}
        id={form.id}
        open={shareLinkState}
        onOpenChange={setShareLinkState}
      />
    </>
  ) : (
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
                <SaveFormBtn id={form.id} formContent={form.content} />
                <PublishFormBtn id={form.id} />
              </>
            )}
            {/* {form.published && (
            <ShareLinkButton
              id={form.id}
              open={shareLinkState}
              onOpenChange={setShareLinkState}
            />
          )} */}
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
