import React, { useState } from "react";
import { MdOutlinePublish } from "react-icons/md";
import { FaSpinner } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { api } from "@/trpc/react";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

const PublishFormBtn = ({ id }: { id: string }) => {
  const [alertState, setAlertState] = useState(false);
  const router = useRouter();
  const utils = api.useContext();
  const { mutate: publish, isLoading } = api.form.publishForm.useMutation({
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Form published successfully 🎉🎉🎉",
      });
    },
    onError: (error) => {
      toast({
        title: "Uh oh! Something went wrong.😟",
        description:
          "There was a problem with your request. Unable to publish your form.",
        action: (
          <ToastAction
            altText="Try again"
            onClick={() => void setAlertState(true)}
          >
            Try again
          </ToastAction>
        ),
        variant: "destructive",
      });
      console.log("Error publishing form : ", error.message);
    },
    onSettled: async () => {
      setAlertState(false);
      await utils.form.getFormById.invalidate({ id });
      router.refresh();
    },
  });

  const publishForm = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    publish({ id });
  };

  return (
    <AlertDialog open={alertState} onOpenChange={setAlertState}>
      <AlertDialogTrigger asChild>
        <Button className="gap-2 bg-gradient-to-r from-indigo-400 to-cyan-400 text-white">
          <MdOutlinePublish className="h-4 w-4" />
          Publish
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. After publishing you will not be able
            to edit this form. <br />
            <br />
            By publishing this form you will make it available to the public and
            you will be able to collect submissions.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isLoading} onClick={publishForm}>
            Continue {isLoading && <FaSpinner className="ml-2 animate-spin" />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PublishFormBtn;
