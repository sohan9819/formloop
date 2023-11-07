"use client";

import React, { useEffect, useState } from "react";
import { HiSaveAs } from "react-icons/hi";

import { Button } from "@/components/ui/button";
import useDesigner from "@/hooks/useDesigner";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { api } from "@/trpc/react";
import { FaSpinner } from "react-icons/fa";

const SaveFormBtn = ({
  id,
  formContent,
}: {
  id: string;
  formContent: string;
}) => {
  const { elements } = useDesigner();
  const jsonContent = JSON.stringify(elements);

  const [isStateChanged, setIsStateChanged] = useState(false);

  useEffect(() => {
    if (formContent !== JSON.stringify(elements)) {
      setIsStateChanged(true);
    } else {
      setIsStateChanged(false);
    }
  }, [formContent, elements]);

  const {
    isLoading,
    mutate: updateFormContent,
    reset,
  } = api.form.updateFormContent.useMutation({
    onMutate: () => {
      setIsStateChanged(false);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Saved changes successfully 🎉🎉🎉",
      });
      setIsStateChanged(false);
    },
    onError: (error) => {
      toast({
        title: "Uh oh! Something went wrong.😟",
        description: "There was a problem with your request.",
        action: (
          <ToastAction altText="Try again" onClick={onClick}>
            Try again
          </ToastAction>
        ),
        variant: "destructive",
      });
      setIsStateChanged(true);
      console.log("Error saving form : ", error.message);
    },
  });

  const onClick = () => {
    if (isStateChanged) {
      reset();
      updateFormContent({ id, jsonContent });
    }
  };

  return (
    <Button
      variant={isStateChanged ? "default" : "outline"}
      className="gap-2"
      onClick={onClick}
    >
      <HiSaveAs className="h-4 w-4" />
      Save
      {isLoading && <FaSpinner className="animate-spin" />}
    </Button>
  );
};

export default SaveFormBtn;
