import FormBuilder from "@/components/form-builder/FormBuilder";
import { api } from "@/trpc/server";
import React from "react";

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const form = await api.form.getFormById.query({ id });

  return <FormBuilder form={form!} />;
};

export default Page;
