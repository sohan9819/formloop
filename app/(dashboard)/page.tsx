import { api } from "@/trpc/server";
import { type RouterOutputs } from "@/trpc/shared";
import { Suspense, type ReactNode } from "react";

import { StatsCardsData } from "@/constants";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import CreateForm from "@/components/CreateForm";

export default function Home() {
  return (
    <div className="container pt-4">
      <Suspense fallback={<StatsCards loading={true} />}>
        <CardStatsWrapper />
      </Suspense>
      <Separator className={"my-6"} />
      <h2 className="col-span-2 text-4xl font-bold">Your forms</h2>
      <Separator className={"my-6"} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <CreateForm />
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
      {StatsCardsData.map((cardData, index) => (
        <StatsCard
          key={index}
          title={cardData.title}
          icon={cardData.icon}
          helperText={cardData.helperText}
          value={data?.visits.toLocaleString() ?? ""}
          loading={loading}
          className={`shadow-md ${cardData.colorClass}`}
        />
      ))}
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
        {!loading && `${value}%`}
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
}
