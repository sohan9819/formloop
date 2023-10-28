"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "react-hot-toast";
import { BsFileEarmarkPlus } from "react-icons/bs";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { api } from "@/trpc/react";

const FormSchema = z.object({
  name: z.string().min(3),
  description: z.string().optional(),
});
type FormSchema = z.infer<typeof FormSchema>;

const CreateForm = () => {
  const [dialogState, setDialogState] = useState(false);
  const utils = api.useContext();
  const router = useRouter();
  const { mutate: createForm } = api.form.create.useMutation({
    onSuccess: ({ id: formId }) => {
      toast.success("Form created successfully");
      console.log("Form created successfully : ", formId);
      router.refresh();
      router.push(`/builder/${formId}`);
      void utils.form.getForms.invalidate();
    },
    onError: (error) => {
      toast.error("Error creating a form");
      console.log("Error creating a form :", error.message);
    },
    onSettled: () => {
      setDialogState(false);
    },
  });

  const form = useForm<FormSchema>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (values: FormSchema) => {
    console.log("Form values : ", values);
    createForm(values);
  };

  return (
    <Dialog open={dialogState} onOpenChange={setDialogState}>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="group flex h-[190px] flex-col items-center justify-center gap-4 border border-dashed border-primary/20 bg-background hover:cursor-pointer hover:border-primary"
        >
          <BsFileEarmarkPlus className="h-8 w-8 text-muted-foreground group-hover:text-primary" />
          <span className="text-xl font-bold text-muted-foreground group-hover:text-primary">
            Create new form
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Form</DialogTitle>
          <DialogDescription>
            Create a new form to start collecting responses
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter form name" {...field} />
                  </FormControl>
                  {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none"
                      rows={6}
                      placeholder="Enter form name"
                      {...field}
                    />
                  </FormControl>
                  {/* <FormDescription>
                    This is your public display describtion.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button
            className="w-full"
            type="submit"
            disabled={form.formState.isSubmitting}
            onClick={form.handleSubmit(onSubmit)}
          >
            {!form.formState.isSubmitting && "Save"}
            {form.formState.isSubmitting && (
              <ImSpinner2 className="animate-spin" />
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateForm;
