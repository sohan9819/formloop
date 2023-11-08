import { Suspense, type ReactNode } from "react";
import { LuView } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";
import { BiRightArrowAlt } from "react-icons/bi";
import { FileEdit } from "lucide-react";
import { formatDistance } from "date-fns";
import Link from "next/link";

import { type RouterOutputs } from "@/trpc/shared";
import { api } from "@/trpc/server";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import CreateForm from "@/components/CreateForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="container pt-4">
      <Suspense fallback={<StatsCards loading={true} />}>
        <CardStatsWrapper />
      </Suspense>
      <Separator className={"my-6"} />
      <h2 className="col-span-2 text-4xl font-bold">Your forms</h2>
      <Separator className={"my-6"} />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <CreateForm />
        <Suspense
          fallback={[1, 2, 3, 4].map((_, index) => (
            <FormCardSkeleton key={index} />
          ))}
        >
          <FormCards />
        </Suspense>
      </div>
    </div>
  );
}

async function CardStatsWrapper() {
  const stats = await api.form.getFormStats.query();
  return <StatsCards loading={false} data={stats} />;
}

interface StatsCardsProps {
  data?: RouterOutputs["form"]["getFormStats"];
  loading: boolean;
}

function StatsCards(props: StatsCardsProps) {
  const { data, loading } = props;

  return (
    <div className="grid w-full grid-cols-1 gap-4 pt-8 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title={"Total visits"}
        icon={<LuView className="text-blue-600" />}
        helperText={"All time form visits"}
        value={data?.visits.toLocaleString() ?? ""}
        loading={loading}
        className={`shadow-md shadow-blue-600`}
      />
      <StatsCard
        title={"Total submissions"}
        icon={<FaWpforms className="text-yellow-600" />}
        helperText={"All time form submissions"}
        value={data?.submissions.toLocaleString() ?? ""}
        loading={loading}
        className={`shadow-md shadow-yellow-600`}
      />
      <StatsCard
        title={"Submission rate"}
        icon={<HiCursorClick className="text-green-600" />}
        helperText={"Visits that result in form submission"}
        value={data?.submissionRate.toLocaleString() + "%" ?? ""}
        loading={loading}
        className={`shadow-md shadow-green-600`}
      />
      <StatsCard
        title={"Bounce rate"}
        icon={<TbArrowBounce className="text-red-600" />}
        helperText={"Visits that leave without interacting"}
        value={data?.bounceRate.toLocaleString() + "%" ?? ""}
        loading={loading}
        className={`shadow-md shadow-red-600`}
      />
    </div>
  );
}

interface StatsCardProps {
  title: string;
  icon: ReactNode;
  helperText: string;
  value: string;
  loading: boolean;
  className: string;
}

function StatsCard({
  title,
  icon,
  helperText,
  value,
  loading,
  className,
}: StatsCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {loading && (
            <Skeleton>
              <span className="opacity-0">{title}</span>
            </Skeleton>
          )}
          {!loading && title}
        </CardTitle>
        {loading && (
          <Skeleton>
            <span className="opacity-0">{icon}</span>
          </Skeleton>
        )}
        {!loading && icon}
      </CardHeader>
      <CardContent className="py-0 text-2xl font-bold">
        {loading && (
          <Skeleton>
            <span className="opacity-0">0</span>
          </Skeleton>
        )}
        {!loading && value}
      </CardContent>
      <CardFooter>
        <p className="pt-1 text-xs text-muted-foreground">
          {loading && (
            <Skeleton>
              <span className="opacity-0">{helperText}</span>
            </Skeleton>
          )}
          {!loading && helperText}
        </p>
      </CardFooter>
    </Card>
  );
}

function FormCardSkeleton() {
  return <Skeleton className="h-[190px] w-full border-2 border-primary/20" />;
}

async function FormCards() {
  const forms = await api.form.getForms.query();

  return (
    <>
      {forms.map((form, index) => (
        <FormCard key={index} form={form} />
      ))}
    </>
  );
}

function FormCard({
  form,
}: {
  form: RouterOutputs["form"]["getForms"][number];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2">
          <span className="truncate font-bold">{form.name}</span>
          {form.published && <Badge>Published</Badge>}
          {!form.published && <Badge variant={"destructive"}>Draft</Badge>}
        </CardTitle>
        <CardDescription className="flex items-center justify-between text-muted-foreground">
          {formatDistance(form.createdAt, new Date(), { addSuffix: true })}
          {form.published && (
            <span className="flex items-center gap-2">
              <LuView className="text-muted-foreground" />
              <span>{form.visits.toLocaleString()}</span>
              <FaWpforms className="text-muted-foreground" />
              <span>{form.submissions.toLocaleString()}</span>
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
        {form.description || "No description"}
      </CardContent>
      <CardFooter>
        {form.published && (
          <Button asChild className="mt-2 w-full gap-4 text-base">
            <Link href={`/forms/${form.id}`}>
              View submissions <BiRightArrowAlt />
            </Link>
          </Button>
        )}
        {!form.published && (
          <Button
            asChild
            className="mt-2 w-full gap-2 text-base"
            variant={"secondary"}
          >
            <Link href={`/builder/${form.id}`}>
              Edit form <FileEdit className="h-4 w-4" />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
