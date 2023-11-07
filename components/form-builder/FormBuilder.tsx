"use client";

import React, { useEffect } from "react";
import { type Form } from "@prisma/client";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Confetti from "react-confetti";

import PublishFormBtn from "@/components/form-builder/PublishFormBtn";
import SaveFormBtn from "@/components/form-builder/SaveFormBtn";
import PreviewDialogBtn from "@/components/form-builder/PreviewDialogBtn";
import Designer from "@/components/form-builder/Designer";
import DragOverlayWrapper from "@/components/form-builder/DragOverlayWrapper";
import useDesigner from "@/hooks/useDesigner";
import { type FormElementInstance } from "./FormElements";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

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

  const { setElements, setSelectedElement } = useDesigner();

  const shareUrl = `${window.location.origin}/submit/${form.shareUrl}`;

  useEffect(() => {
    const formElements = JSON.parse(form.content) as FormElementInstance[];
    setElements(formElements);
  }, [form, setElements]);

  if (form.published) {
    return (
      <>
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
        />
        <div className="flex h-full w-full flex-col items-center justify-center">
          <div className="max-w-md">
            <h1 className="mb-10 border-b pb-2 text-center text-2xl font-bold text-primary">
              🎊🎊 Form Published 🎊🎊
            </h1>
            <h2 className="text-xl">Share this form</h2>
            <h3 className="text-l border-b pb-10 text-muted-foreground">
              Anyone with this link can view and submit the form
            </h3>
            <div className="mt-4 flex w-full flex-col items-center gap-2 border-b pb-4">
              <Input className="w-full" readOnly value={shareUrl} />
              <Button
                className="mt-2 w-full"
                onClick={() => {
                  void navigator.clipboard.writeText(shareUrl);
                  toast({
                    title: "Copied!",
                    description: "Link copied to clipboard",
                  });
                }}
              >
                Copy link
              </Button>
            </div>
            <div className="flex justify-between">
              <Button asChild variant={"link"}>
                <Link href={"/"} className="gap-2">
                  <BsArrowLeft />
                  Go back home
                </Link>
              </Button>
              <Button asChild variant={"link"}>
                <Link href={`/forms/${form.id}`} className="gap-2">
                  Form details
                  <BsArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

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
                <SaveFormBtn id={form.id} formContent={form.content} />
                <PublishFormBtn id={form.id} />
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
